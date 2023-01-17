# \n\nNo Gas calculation for Contract Opcodes\n\n

\n\nThere was no execution fee for running smart contracts on Phantasma node.\n\n

### CBV ID: CBV-23-00004
### Blockchain: \n\nPhantasma\n\n
### Version affected: \n\n-\n\n
### Component: \n\nVM\n\n
### Severity: \n\n8.0\n\n
### Vulnerability Type: \n\n-\n\n
### Credits: \n\n@lukeciatt\n\n
### Last updated: 17 Jan 2023

## Details

\n\nThere was no execution fee for running smart contracts on Phantasma node.\r\nIt caused the Phantasma node to be highly vulnerable to the DoS attack by running a function of the smart contract which contained an infinite while loop.\r\n\r\nTo reproduce the bug you have to deploy the below contract and call the test function with very big integer number as an input.\r\nYou may see the node gets crashed or freezed.\r\n\r\n\r\n\r\nAll the nodes which has the open RPC ports could be affected by this bug.\n\n

## Recomendations

\n\nYou may either deduct the execution fee from the user who is calling the smart contract or define a maximum opcodes or gas inside the VM for running the opcodes.\n\n

## References

\n\n-\n\n

### Labels: \n\n-\n\n

## Test

\n\n-\n\n

## Aditional comments

\n\n-\n\n
