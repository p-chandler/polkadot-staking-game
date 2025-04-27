# Polkadot Asset Hub - Play-to-Earn Token Staking Game

A simple Play-to-Earn Token Staking Game built on Polkadot Asset Hub for the hackathon. This project combines gaming and DeFi elements, allowing users to stake tokens to participate in a lottery/reward system.

## Project Overview

This project demonstrates the capabilities of Polkadot Asset Hub by implementing a custom smart contract that enables:

- Token staking with rewards
- Lottery-style gameplay where staking increases winning chances
- Transparent on-chain reward distribution
- Simple and intuitive user interface

## Features

- **Token Staking**: Users can stake tokens to participate in the game
- **Reward System**: Automatic reward distribution based on staked amounts
- **Probability-based Winning**: Higher stakes increase chances of winning
- **User Dashboard**: Track staked amounts, rewards, and winning probability

## Technical Stack

- **Blockchain**: Polkadot Asset Hub
- **Smart Contract**: Solidity (compiled to RISC-V via PolkaVM)
- **Frontend**: React with Polkadot.js API and ethers.js
- **Development Tools**: Remix IDE for Polkadot

## Smart Contract Architecture

The main smart contract (`StakingGame.sol`) implements:

- Staking and unstaking functionality
- Reward pool management
- Weighted random winner selection
- Time-based reward distribution

## Getting Started

### Prerequisites

- MetaMask wallet
- Some WND tokens (for testnet deployment)

### Setup

1. Clone this repository
2. Install dependencies: `npm install`
3. Configure MetaMask for Westend Asset Hub:
   - Network Name: Asset-Hub Westend Testnet
   - RPC URL: https://westend-asset-hub-eth-rpc.polkadot.io
   - Chain ID: 420420421
   - Currency Symbol: WND
   - Block Explorer URL: https://assethub-westend.subscan.io

### Deployment

1. Deploy the smart contract using Remix IDE
2. Update the contract address in the frontend configuration
3. Start the frontend: `npm start`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Polkadot Developer Documentation
- Polkadot Asset Hub Team
- Hackathon Organizers
