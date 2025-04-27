# Deployment Information

## GitHub Pages Deployment

The frontend application is deployed and accessible at:

**Live Demo URL**: [https://p-chandler.github.io/polkadot-staking-game/](https://p-chandler.github.io/polkadot-staking-game/)

## How to Use the Live Demo

1. Visit the URL above
2. Connect your MetaMask wallet (configured for Westend Asset Hub)
3. Interact with the deployed smart contracts

## Local Development

To run the application locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Updating the Deployment

If you make changes to the application, you can update the deployment with:

```bash
npm run deploy
```

This will build the application and publish it to GitHub Pages.

## Note on Smart Contract Interaction

The live demo is configured to interact with smart contracts deployed on the Westend Asset Hub testnet. To use the application:

1. Configure MetaMask for Westend Asset Hub (see demo_instructions.md)
2. Obtain WND tokens from the Westend faucet
3. Deploy the smart contracts or use existing deployed contracts

The frontend will automatically connect to the deployed contracts when you connect your wallet.
