import fs from "fs/promises"
import * as Buffer from "buffer"
import {SelectionOptions} from "./select"

export async function validate(options: any): Promise<SelectionOptions> {
    const csvFile = await fs.readFile(options.csv)
    const values = parseCsv(csvFile)

    const round = Math.floor(Number.parseInt(options.round))
    if (round < 1) {
        throw Error("You must provide a drand round of 1 or higher")
    }

    const count = Math.floor(Number.parseInt(options.count))
    if (count < 1) {
        throw Error("You must provide a count of 1 or higher")
    }

    return {
        values,
        round,
        count
    }
}


function parseCsv(buffer: Buffer): string[] {
    return buffer.toString()
        .split(",")
        .map(entry => entry.replaceAll("\"", ""))
}
