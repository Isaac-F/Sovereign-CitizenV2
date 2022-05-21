# Sovereign Citizen
The following project is designed to make bootstrapping EVM-based decentralized web applications as painless as possible. This project has the following stack:
* **Smart Contract Dev Framework:** Hardhat
* **Web Framework:** NextJS (TypeScript)
* **UI Framework:** Chakra-UI

# Set Up / Configure
Install packages from root dir and within `nextjs` via `npm install`

For the sake of this project, you should install hardhat shorthand:
```
npm i -g hardhat-shorthand
```

Use the command below in the folder `nextjs` to start the app on the local host:
```
npm run dev
```

Keep in mind that a Metamask account is required for the use of the app and functionality will not work without the smart contract deployed.


# Work Flow Guide
## Smart Contract Development
The root of the project follows a standard hardhat file structure:
* `contracts`: Solidity smart contracts
* `scripts`: Scripts to run against your smart contracts or to deploy your smart contracts
* `typechain`: The generated types for your smart contracts
* `test`: Chai testing suite 
* `hardhat.config.ts`: Hardhat configuration file - can add new networks in here

### Local Deployment
Hardhat allows you to run a localhost EVM chain which you can deploy your contracts to for testing. To run the EVM chain, execute `hh node` in a seperate terminal.

Next to deploy your smart contracts, run the `deploy.ts` script targetting the `localhost` network:
```
hh run --network localhost scripts/deploy.ts
```

If you get an issue with running the command above, try downgrading the node.js version to the latest LTV.

For each contract you deploy, you should run this function to ensure the frontend has the most recently instance of your contracts.

This will also generate the contract JSON ABI within `nextjs/resources/hardhat/artifacts`, which is then used by the frontend to connect with the contracts.

### Testing
You should ofcourse test all your Smart Contracts. This can be done by adding new scripts to the `test` directory. Copy the pattern shown in `index.ts` to get started.

## Front End
### Chain/Contract Interactions
The front end uses the user's ethereum provider (metamask) to interact with smart contracts, or a default provider if a user does no have a provider installed/connected (view only though). 

A custom hook has been written within `core/ethereum.ts`, `useDappStatus()` to provide core automatically updating variables and functions required for DApps.
The `useDappStatus` hook provides the following:
* `connectionStatus`: an enum describing whether the user as an ethereum provider connected or not.
* `connectedAccount`: a string hex address of the ethereum provider account connected (if any).
* `currentChain`: an enum of the current chain connected on the users ethereum provider (if any and if known).
* `requestConnectWallet`: a function which will request the user's ethereum provider to connect (if any).
* `requestSwitchChain`: a function which will request the user's ethereum provider to switch to the desired chain (if any).
* `dappAPI`: a object containing:
    * `signer`: the user's ethereum provider's signer account (if any). Used for signing messages if required.
    * `isViewOnly`: whether the DApp APIs can only be used for viewing (or if writing transactions is allowed to). View only is the case when a default provider is used instead of a user's ethereum provider.
    * `greeter`: An API for the `Greeter` smart contract on the desired chain with the given provider (either the user's ethereum provider or a default view-only provider). This is the main entry into smart contract interactions. See `nextjs/pages/playground/..` for example usages.

As you create new contracts, you should add them as a property to `dappAPI` copying the pattern in which it is done for the `dappAPI.greeter` property.

### Identites.tsx
This file in the /nextjs/pages folder is the main page for the app. This page contains the functions used to communicate with the smart contract.

### DID Contract
The file Did.sol in the /contracts folder is the DID smart contract used for the app. This, along with the code for generating DIDs and their DID documents, were obtaiend from the uport-project/ethr-did project https://github.com/uport-project/ethr-did.
