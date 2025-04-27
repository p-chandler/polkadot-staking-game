# Play-to-Earn Token Staking Game

A DeFi gaming application built on the Polkadot ecosystem for the Polkadot Asset Hub Hackathon.

## Live Demo

**Live Application**: [https://p-chandler.github.io/polkadot-staking-game/](https://p-chandler.github.io/polkadot-staking-game/)

**Deployed Contract**: [0x7B3ad466410e29Aa6C84e8621a9dDefab8DD9B9d](https://moonbase.moonscan.io/address/0x7B3ad466410e29Aa6C84e8621a9dDefab8DD9B9d)

## Project Overview

The Play-to-Earn Token Staking Game combines DeFi and gaming elements to create an engaging blockchain experience. Users stake tokens to participate in a lottery/reward system where the probability of winning is proportional to the amount staked.

### Key Features

- **Token Staking**: Users can stake tokens to participate in the game
- **Probability-Based Rewards**: Higher stakes increase chances of winning
- **DeFi Integration**: Financial incentives through staking and rewards
- **Polkadot Ecosystem**: Built on Moonbeam, a Polkadot parachain

## Technical Implementation

### Smart Contracts

The project includes several smart contract implementations:
- `StakingGame.sol`: Main contract with full functionality
- `SimpleStakingGame.sol`: Simplified version deployed to Moonbeam
- `MinimalGame.sol`: Minimal implementation for testing
- `UltraMinimal.sol`: Ultra-minimal version for deployment testing

### Frontend

- React-based frontend with MetaMask integration
- Automatic connection to deployed contract on Moonbase Alpha
- Demo mode for users without MetaMask or testnet tokens
- Responsive design for both desktop and mobile

### Deployment

The smart contract is deployed on Moonbase Alpha (Moonbeam's testnet), a Polkadot parachain that provides Ethereum compatibility. This approach leverages Polkadot's ecosystem while providing a familiar development experience.

## How Polkadot Was Used

This project demonstrates how Polkadot's ecosystem can be leveraged for gaming and DeFi applications:

1. **Parachain Integration**: Utilizes Moonbeam, a Polkadot parachain
2. **Cross-Chain Potential**: Can be extended to interact with other Polkadot parachains
3. **Scalability**: Benefits from Polkadot's scalable architecture
4. **Security**: Inherits security from Polkadot's shared security model

## Technical Stack

- **Smart Contracts**: Solidity
- **Frontend**: React, ethers.js
- **Blockchain**: Moonbeam (Polkadot parachain)
- **Development Tools**: Remix IDE, MetaMask
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- MetaMask wallet
- Moonbase Alpha testnet configuration
- DEV tokens (available from [Moonbase Faucet](https://faucet.moonbeam.network/))

### Using the Application

1. Visit [https://p-chandler.github.io/polkadot-staking-game/](https://p-chandler.github.io/polkadot-staking-game/)
2. Connect your MetaMask wallet (configured for Moonbase Alpha)
3. The application will automatically connect to the deployed contract
4. Stake tokens, view your winning probability, and participate in rewards

### Local Development

1. Clone the repository
```
git clone https://github.com/p-chandler/polkadot-staking-game.git
cd polkadot-staking-game
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm start
```

## Documentation

- [Project Description](./docs/project_description.md)
- [Technical Documentation](./docs/technical_documentation.md)
- [Demo Instructions](./docs/demo_instructions.md)
- [Deployment Attempts](./docs/deployment_attempts.md)
- [Submission Package](./docs/submission_package.md)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Polkadot and Moonbeam teams for their excellent documentation
- The hackathon organizers for the opportunity to build on Polkadot
