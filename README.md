# Drandomiser 🎲
A tool for randomly selecting identifiers from a pre-provided list.

## Situation

Social Income disburse monthly payouts of $45 to people in need in Sierra Leone from donors in (mostly) developed countries. They currently select the recipients on a somewhat manual basis (to maintain balance with respect to gender balance, age, etc). Payouts are made to mobile payment systems that are commonplace in Sierra Leone.

## Mission
To integrate drand randomness in their recipient selection process to enable transparent and fair selection of who should receive basic income.

## Execution
We will deliver a solution in three phases:

1. _create a standalone tool for selecting random participants to become recipients._  
   The tool will take a csv file of participant UIDs, a target drand round number and the number of participants that will be selected.
   When the specificed drand round has been created, the randomness will be consumed by the tool and the list of chosen recipients will be output.
   These participants will then be paid manually using the existing system and recorded.
   Social Income will post the participant list, chosen drand round number and the code for the tool on their website in advance, so that third parties can verify the output for themselves.
   Payouts will be livestreamed to increase transparency.

2. _integrate this tool with the existing socialincome tools._  
   As the website and admin panel code is open source, the drand tool and reporting of its output will be integrated into both to enable automatic payments without human intervention. This will lower the risk of malicious human intervention in the process.

3. _develop a smart contract to automate the selection and payout process._  
   Once drand is integrated with a blockchain ecosystem, the registration of participant UIDs, consumption of the drand beacon and payout process can be automated as such that no human can influence the process (either by selecting a participant manually or failing to pay out chosen participants)

## Outstanding questions
- do we need to mask UIDs for security purposes?
- can we provide an easy way for participants to verify their inclusion in the process?
- can such as trusted execution environments or code attestations be used to ensure a higher guarantee that social income is running the software they say they are?
- how can trust in the payment services provider be reduced?
- how can we easily mandate a balance of other characteristics such as gender, location or age group without exposing user data?

## Running the project

### Prerequisites
- node 19+
- npm 9+

Versions lower than 19 might work, but you might need to wave your magic wand to get `fetch` working.

### Quickstart
- install the dependencies by running `npm install`
- compile the tool by running `npm run compile`
- run the tool using node by running `node dist/index.js run --count=1 --round=1 --csv=./path/to/csv/file.csv`, replacing the values as appropriate.

### Slowstart
Same as the quick start but prepare a coffee ☕

### CLI params
- **csv**  
  the csv file containing the values you wish to draw from
- **count**  
the number of values you wish to select from the CSV file
- **round**  
the drand round number you have committed to for providing randomness for the draw

### TODO
- [ ] waiting for a drand round to happen rather than assuming it has already passed
- [ ] check value counts to ensure no modulo bias
- [ ] a more complete CSV parser
- [ ] support other file formats
- [ ] provide an API for uploading files
- [ ] a nice web UI to make it easy to use
- [ ] a nice web UI for reporting the status of ongoing/upcoming draws
- [ ] webhook integration to enable triggering actions based on the output
- [ ] create a tool for participants to see if their entry is in an upcoming draw
- [ ] make the tool long-running for multiple draws
