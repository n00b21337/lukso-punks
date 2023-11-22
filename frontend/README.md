# NFT Minting dApp Starter

A full stack dApp starter for minting NFTs built on Ethereum (Solidity) with Next.js (React).

This repo contains boilerplate code for minting NFTs from the client-side using [Solidity](https://soliditylang.org/), [React](https://reactjs.org/) and [TailwindCSS](https://tailwindcss.com/).

![NFT Minting dApp Starter](/public/screenshot.png)


### Clone This Repo and do the Environment Setup

Set variables in next.confgi.js  you can also use .env or .env.local variable

### Importing The Smart Contract Locally

Smart contracts are done in other repository, here we need to just paste ABI json to contracts dir and import it

## Editing The Front-End

To modify the front page of your application, edit `pages/index.js`.

All [TailwindCSS classes](https://tailwindcss.com/docs) are available to you.

To lint your front-end code, use `npm run lint`.

###  State of BRANCH
This branch is using rainbow wallet with wagmi library for smart contracts interaction
As this is clean branch, this means we are using only SC data which means we use enumerable SC contract
or at least one with functions that return IDS of tokens owned per address more on this here
https://medium.com/coinmonks/comparison-of-the-most-popular-erc721-templates-b3614353e31e