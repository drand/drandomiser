import * as fs from "fs/promises"

type AppArgs = {
    csv: Buffer,
    drandRound: number
}

export async function cliArgs(): Promise<AppArgs> {
    const args = process.argv.slice(2).join(" ")
    const csvStr = extractArgument(args, "csv")
    const csv = await fs.readFile(csvStr)

    const drandRoundStr = extractArgument(args, "round")
    const drandRound = Number.parseInt(drandRoundStr)
    if (drandRound < 1) {
        throw Error("You cannot provide a negative drand round!")
    }
    return {
        csv,
        drandRound
    }
}

function extractArgument(input: string, tag: string): string {
    const matches = RegExp(`--${tag}=(.*) `).exec(input)
    if (!matches || matches.length === 0) {
        throw Error(`could not find CLI arg for ${tag}`)
    }

    return matches[1]
}