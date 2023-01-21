import {sha256} from "@noble/hashes/sha256"
import {fetchBeacon, HttpCachingChain, HttpChainClient} from "drand-client"

export type SelectionOptions = {
    round: number
    count: number
    values: string[]
}

export async function select(options: SelectionOptions): Promise<string[]> {
    // if we're picking equal or more values than exist, return them all
    if (options.count >= options.values.length) {
        return options.values
    }

    // let's get the chosen random number from drand
    const chain = new HttpCachingChain("https://api.drand.sh")
    const client = new HttpChainClient(chain)
    const beacon = await fetchBeacon(client, options.round)

    // We sort the values lexographically to ensure repeatability
    // now we're going to hash the randomness for each draw we want to do and turn it into an index.
    // We then draw the value for that index from our `remainingValues` array and repeat the process,
    // remove it from that array, and repeat the process until we have no draws left to do
    let remainingValues = options.values.slice().sort()
    let remainingDraws = options.count
    let currentRandomness: Uint8Array = Buffer.from(beacon.randomness, "hex")
    let chosenValues: string[] = []

    while (remainingDraws > 0) {
        currentRandomness = sha256.create().update(currentRandomness).digest()
        const chosenIndex = indexFromRandomness(currentRandomness, remainingDraws)

        chosenValues = [...chosenValues, remainingValues[chosenIndex]]
        remainingValues = [
            ...remainingValues.slice(0, chosenIndex),
            ...remainingValues.slice(chosenIndex + 1, remainingValues.length)
        ]
        remainingDraws--
    }

    return chosenValues
}

function indexFromRandomness(randomBytes: Uint8Array, totalEntryCount: number): number {
    // should probably add a check that the entryCount is small enough to avoid modulo bias here
    const someBigNumber = bufferToBigInt(randomBytes)
    return Number(someBigNumber % BigInt(totalEntryCount))
}


function bufferToBigInt(buffer: Uint8Array): bigint {
    let output = BigInt(0)
    for (let i = buffer.length - 1; i >= 0; i--) {
        output = output * BigInt(256) + BigInt(buffer[i])
    }

    return output
}