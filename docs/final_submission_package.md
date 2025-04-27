# Hackathon Submission Package

## Project Information

- **Project Name**: Play-to-Earn Token Staking Game
- **GitHub Repository**: https://github.com/p-chandler/polkadot-staking-game
- **Live Demo**: https://p-chandler.github.io/polkadot-staking-game/
- **Deployed Contract**: https://moonbase.moonscan.io/address/0x7B3ad466410e29Aa6C84e8621a9dDefab8DD9B9d

## Project Description

The Play-to-Earn Token Staking Game combines DeFi and gaming elements to create an engaging blockchain experience on the Polkadot ecosystem. Users stake tokens to participate in a lottery/reward system where the probability of winning is proportional to the amount staked.

### Problems Solved

1. **Engagement with DeFi**: Traditional staking lacks engagement; our solution gamifies the experience
2. **User Retention**: Creates incentives for continued participation through probability-based rewards
3. **Accessibility**: Provides an intuitive interface for interacting with blockchain technology
4. **Cross-Chain Potential**: Demonstrates how Polkadot's ecosystem can support gaming and DeFi applications

### How Polkadot Was Used

This project leverages Polkadot's ecosystem through Moonbeam, a Polkadot parachain that provides Ethereum compatibility:

1. **Parachain Integration**: Deployed on Moonbeam, benefiting from Polkadot's shared security
2. **Scalability**: Utilizes Polkadot's efficient consensus mechanism
3. **Cross-Chain Foundation**: Built with potential for future cross-parachain interactions
4. **Ecosystem Participation**: Contributes to the growing Polkadot DeFi ecosystem

## Technical Description

### SDKs and Tools Used

- **Smart Contracts**: Solidity for contract development
- **Frontend**: React with ethers.js for blockchain interaction
- **Deployment**: Remix IDE for contract deployment to Moonbase Alpha
- **Wallet Integration**: MetaMask for Moonbase Alpha connection
- **Version Control**: Git and GitHub for code management
- **Hosting**: GitHub Pages for frontend hosting

### Polkadot-Specific Features

1. **Moonbeam Parachain**: Deployed on a Polkadot parachain, benefiting from the ecosystem's security and interoperability
2. **Future Cross-Chain Potential**: Architecture designed for potential expansion to other Polkadot parachains
3. **Scalability Benefits**: Leverages Polkadot's efficient consensus for better performance than traditional blockchains

### Smart Contract Architecture

The project includes several smart contract implementations, with the SimpleStakingGame.sol deployed to Moonbeam:

```solidity
// Key functions in SimpleStakingGame.sol
function stake() external payable {
    // Update staked balance
    stakedBalances[msg.sender] += msg.value;
    
    // Update total staked
    totalStaked += msg.value;
    
    // Add 10% of stake to reward pool
    uint256 rewardContribution = msg.value / 10;
    rewardPool += rewardContribution;
    
    emit Staked(msg.sender, msg.value);
}

function getWinningProbability(address user) external view returns (uint256) {
    if (totalStaked == 0) {
        return 0;
    }
    return (stakedBalances[user] * 100) / totalStaked;
}
```

## Unique Aspects

What makes this project uniquely possible on Polkadot:

1. **Parachain Ecosystem**: Leverages Polkadot's parachain architecture for future cross-chain functionality
2. **Scalability**: Benefits from Polkadot's efficient consensus for better performance
3. **Shared Security**: Inherits security from Polkadot's shared security model
4. **Interoperability**: Built on a foundation that allows for future integration with other parachains

## Deployment Information

The smart contract is deployed on Moonbase Alpha (Moonbeam's testnet):

- **Contract Address**: 0x7B3ad466410e29Aa6C84e8621a9dDefab8DD9B9d
- **Block Explorer**: https://moonbase.moonscan.io/address/0x7B3ad466410e29Aa6C84e8621a9dDefab8DD9B9d
- **Network**: Moonbase Alpha (Moonbeam Testnet)

*Note: While the hackathon specified Asset Hub deployment, we encountered persistent technical issues with the Asset Hub testnet RPC endpoint. As an alternative solution that still demonstrates Polkadot ecosystem integration, we deployed to Moonbase Alpha, which is Moonbeam's testnet. Moonbeam is a Polkadot parachain that provides Ethereum compatibility, allowing us to showcase our smart contract in a production-ready Polkadot environment.*

## Additional Resources

- **Presentation**: [docs/presentation.md](https://github.com/p-chandler/polkadot-staking-game/blob/main/docs/presentation.md)
- **Technical Documentation**: [docs/technical_documentation.md](https://github.com/p-chandler/polkadot-staking-game/blob/main/docs/technical_documentation.md)
- **Deployment Attempts**: [docs/deployment_attempts.md](https://github.com/p-chandler/polkadot-staking-game/blob/main/docs/deployment_attempts.md)
- **Demo Instructions**: [docs/demo_instructions.md](https://github.com/p-chandler/polkadot-staking-game/blob/main/docs/demo_instructions.md)

## Future Development

- **Multiple Game Instances**: Factory pattern for various game parameters
- **NFT Integration**: Special tokens that boost winning chances
- **Cross-Chain Functionality**: Interact with other Polkadot parachains
- **Advanced Reward Mechanics**: Time-weighted staking rewards

## License

This project is licensed under the MIT License and will remain available as open source.
