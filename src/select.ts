export type SelectionOptions = {
    round: number
    count: number
    values: string[]
}

export async function select(options: SelectionOptions): Promise<string[]> {
    return [options.values[0]]
}