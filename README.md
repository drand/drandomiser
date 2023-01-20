# Drandomiser 🎲
A tool for randomly selecting identifiers from a pre-provided list.

## Situation

Social Income disburse monthly payouts of $45 to people in need in Sierra Leone from donors in (mostly) developed countries. They currently select the recipients on a somewhat manual basis (to maintain balance with respect to gender balance, age, etc). Payouts are made to mobile payment systems that are commonplace in Sierra Leone.

## Mission
To integrate drand randomness in their recipient selection process to enable transparent and fair selection of who should receive basic income.

## Execution
We will deliver a solution in three phases:

1. create a standalone tool for selecting random participants to become recipients.
   The tool will take a csv file of participant UIDs, a target drand round number and the number of participants that will be selected.
   When the specificed drand round has been created, the randomness will be consumed by the tool and the list of chosen recipients will be output.
   These participants will then be paid manually using the existing system and recorded.
   Social Income will post the participant list, chosen drand round number and the code for the tool on their website in advance, so that third parties can verify the output for themselves.
   Payouts will be livestreamed to increase transparency.

2. integrate this tool with the existing socialincome tools
   As the website and admin panel code is open source, the drand tool and reporting of its output will be integrated into both to enable automatic payments without human intervention. This will lower the risk of malicious human intervention in the process.

3. develop a smart contract to automate the selection and payout process
   Once drand is integrated with a blockchain ecosystem, the registration of participant UIDs, consumption of the drand beacon and payout process can be automated as such that no human can influence the process (either by selecting a participant manually or failing to pay out chosen participants)


## Outstanding questions
- do we need to mask UIDs for security purposes?
- can we provide an easy way for participants to verify their inclusion in the process?
- can such as trusted execution environments or code attestations be used to ensure a higher guarantee that social income is running the software they say they are?
- how can trust in the payment services provider be reduced?
- how can we easily mandate a balance of other characteristics such as gender, location or age group without exposing user data?


## Running the project

### Prerequisites
- node 16+
- npm 8+

### Quickstart
First, you must install the dependencies by running `npm install`
To start the tool, run `npm start`

### Slowstart
Same as the quick start but prepare a coffee ☕