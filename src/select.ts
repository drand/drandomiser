import {fetchBeacon, HttpCachingChain, HttpChainClient} from "drand-client"

export type SelectionOptions = {
    round: number
    count: number
    values: string[]
}

export async function select(options: SelectionOptions): Promise<string[]> {
    const chain = new HttpCachingChain("https://api.drand.sh")
    const client = new HttpChainClient(chain)
    const beacon = await fetchBeacon(client, options.round)

    const randomBytes = Buffer.from(beacon.randomness, "hex")
    const someBigNumber = bufferToBigInt(randomBytes)

    const selectedIndex = someBigNumber % BigInt(options.values.length)

    const sortedValues = options.values.slice().sort()
    return [sortedValues[Number(selectedIndex)]]
}

function bufferToBigInt(buffer: Uint8Array): bigint {
    let output = BigInt(0)
    for (let i = buffer.length - 1; i >= 0; i--) {
        output = output * BigInt(256) + BigInt(buffer[i])
    }

    return output
}