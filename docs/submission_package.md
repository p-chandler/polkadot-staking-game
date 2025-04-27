# Submission Package: Play-to-Earn Token Staking Game

## Project Information

- **Project Name**: Play-to-Earn Token Staking Game
- **Track**: Open Track (Gaming + DeFi)
- **Blockchain**: Polkadot Asset Hub
- **GitHub Repository**: https://github.com/p-chandler/polkadot-staking-game

## Project Summary

The Play-to-Earn Token Staking Game is a decentralized application that combines gaming and DeFi elements on Polkadot Asset Hub. Users can stake tokens to participate in a lottery/reward system where the probability of winning is proportional to the amount staked. This project demonstrates the capabilities of Polkadot Asset Hub's smart contract functionality and showcases how gaming and DeFi can be integrated in a single application.

## Key Features

- Token staking with rewards
- Lottery-style gameplay where staking increases winning chances
- Transparent on-chain reward distribution
- Factory pattern for creating multiple game instances
- Comprehensive statistics and probability tracking

## Technical Implementation

- **Smart Contracts**: Custom Solidity contracts compiled for PolkaVM
- **Frontend**: React with ethers.js and Polkadot.js API
- **Deployment**: Westend Asset Hub testnet

## Documentation Links

- **Project Description**: [docs/project_description.md](https://github.com/p-chandler/polkadot-staking-game/blob/main/docs/project_description.md)
- **Technical Documentation**: [docs/technical_documentation.md](https://github.com/p-chandler/polkadot-staking-game/blob/main/docs/technical_documentation.md)
- **Demo Instructions**: [docs/demo_instructions.md](https://github.com/p-chandler/polkadot-staking-game/blob/main/docs/demo_instructions.md)
- **Deployment Instructions**: [contracts/DeploymentInstructions.sol](https://github.com/p-chandler/polkadot-staking-game/blob/main/contracts/DeploymentInstructions.sol)

## Smart Contract Code

- **StakingGame**: [contracts/StakingGame.sol](https://github.com/p-chandler/polkadot-staking-game/blob/main/contracts/StakingGame.sol)
- **StakingGameFactory**: [contracts/StakingGameFactory.sol](https://github.com/p-chandler/polkadot-staking-game/blob/main/contracts/StakingGameFactory.sol)
- **Test Script**: [contracts/StakingGameTest.sol](https://github.com/p-chandler/polkadot-staking-game/blob/main/contracts/StakingGameTest.sol)
- **Deployer**: [contracts/StakingGameDeployer.sol](https://github.com/p-chandler/polkadot-staking-game/blob/main/contracts/StakingGameDeployer.sol)

## Frontend Code

- **Main Application**: [src/App.js](https://github.com/p-chandler/polkadot-staking-game/blob/main/src/App.js)
- **Styling**: [src/App.css](https://github.com/p-chandler/polkadot-staking-game/blob/main/src/App.css)

## Deployment Information

### Testnet Deployment

The smart contracts can be deployed to the Westend Asset Hub testnet using the instructions provided in the DeploymentInstructions.sol file. The contracts use the following configuration:

- **Network**: Asset-Hub Westend Testnet
- **RPC URL**: https://westend-asset-hub-eth-rpc.polkadot.io
- **Chain ID**: 420420421
- **Currency Symbol**: WND
- **Block Explorer**: https://assethub-westend.subscan.io

### Deployment Verification

After deployment, the contracts can be verified on the block explorer by searching for the contract address. The verification process confirms that the deployed bytecode matches the source code.

## How Polkadot Asset Hub Was Used

This project leverages several key features of Polkadot Asset Hub:

1. **Native EVM Contracts**: Deployed Solidity-based smart contracts directly on Asset Hub
2. **PolkaVM Architecture**: Utilized PolkaVM's register-based design for improved performance
3. **Multi-dimensional Gas Model**: Benefited from more accurate cost assessments for contract execution
4. **Seamless Asset Management**: Leveraged Asset Hub's token capabilities for staking and rewards

## Future Enhancements

1. **NFT Integration**: Adding NFT rewards or NFT-based staking multipliers
2. **Cross-chain Functionality**: Enabling interaction with other parachains in the Polkadot ecosystem
3. **Advanced Game Mechanics**: Implementing more complex game mechanics like tournaments or challenges
4. **Governance Features**: Adding DAO-like governance for parameter adjustments

## Conclusion

The Play-to-Earn Token Staking Game demonstrates how Polkadot Asset Hub can be used to create engaging applications that combine gaming and DeFi elements. By leveraging PolkaVM's performance benefits and Polkadot's ecosystem advantages, the application provides a seamless user experience while showcasing the potential of blockchain gaming.
