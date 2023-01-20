import {Command} from "commander"
import {validate} from "./validate"
import {select} from "./select"
import {print} from "./print"

const program = new Command()
    .name("drandomiser")
    .description("a CLI for selecting random entries from a CSV file")
    .version("0.0.1")

program.command("run")
    .description("Waits until the drand round specified and outputs the list of selected items from the CSV file provided")
    .requiredOption("--csv <csv>", "the CSV file of entries from which to select")
    .requiredOption("--round <round>", "the drand round that will be used to provide the randomness")
    .requiredOption("--count <count>", "the number of items to draw from the csv file")
    .action(async (options) => {
        try {
            const validatedOptions = await validate(options)
            const result = await select(validatedOptions)
            print(result)
        }catch (err) {
            console.error(err)
        }
    })

program.parse()