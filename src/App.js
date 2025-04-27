import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

// ABI for SimpleStakingGame contract
const gameAbi = [
  "function stake() external payable",
  "function unstake(uint256 amount) external",
  "function distributeReward() external",
  "function getRewardPool() external view returns (uint256)",
  "function getStakedBalance(address user) external view returns (uint256)",
  "function getWinningProbability(address user) external view returns (uint256)",
  "function totalStaked() external view returns (uint256)",
  "function rewardPool() external view returns (uint256)",
  "function owner() external view returns (address)",
  "event Staked(address indexed user, uint256 amount)",
  "event Unstaked(address indexed user, uint256 amount)",
  "event RewardDistributed(address indexed winner, uint256 amount)"
];

// Deployed contract address on Moonbase Alpha
const DEPLOYED_CONTRACT_ADDRESS = "0x7B3ad466410e29Aa6C84e8621a9dDefab8DD9B9d";

function App() {
  // State variables
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState('');
  const [gameContract, setGameContract] = useState(null);
  const [gameAddress, setGameAddress] = useState(DEPLOYED_CONTRACT_ADDRESS);
  const [stakeAmount, setStakeAmount] = useState('0.01');
  const [unstakeAmount, setUnstakeAmount] = useState('0.01');
  const [stakedBalance, setStakedBalance] = useState('0');
  const [totalStaked, setTotalStaked] = useState('0');
  const [rewardPool, setRewardPool] = useState('0');
  const [winningProbability, setWinningProbability] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [networkName, setNetworkName] = useState('');

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed. Please install MetaMask to use this application.");
      }
      
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setAccount(account);
      
      // Create provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      
      const signer = await provider.getSigner();
      setSigner(signer);
      
      // Check if we're on the correct network
      const network = await provider.getNetwork();
      setNetworkName(network.name);
      
      if (network.chainId.toString() === '1287') {
        setNotification("Connected to Moonbase Alpha (Moonbeam Testnet)");
        // Auto-connect to deployed contract
        connectToDeployedContract(signer);
      } else {
        setNotification("Please connect to Moonbase Alpha (Chain ID: 1287) to interact with the deployed contract");
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setError(error.message || "Failed to connect wallet");
      setIsLoading(false);
    }
  };

  // Connect to deployed contract
  const connectToDeployedContract = async (signerToUse) => {
    try {
      setIsLoading(true);
      setError('');
      
      // Create game contract instance
      const game = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, gameAbi, signerToUse);
      setGameContract(game);
      
      // Load game data
      await loadGameData(game);
      
      setNotification("Connected to deployed contract on Moonbase Alpha!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error connecting to deployed contract:", error);
      setError(error.message || "Failed to connect to deployed contract");
      setIsLoading(false);
    }
  };

  // Connect to custom contract
  const connectToContract = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      if (!gameAddress || !ethers.isAddress(gameAddress)) {
        throw new Error("Please enter a valid contract address");
      }
      
      // Create game contract instance
      const game = new ethers.Contract(gameAddress, gameAbi, signer);
      setGameContract(game);
      
      // Load game data
      await loadGameData(game);
      
      setNotification("Connected to contract successfully!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error connecting to contract:", error);
      setError(error.message || "Failed to connect to contract");
      setIsLoading(false);
    }
  };

  // Enable demo mode
  const enableDemoMode = () => {
    setDemoMode(true);
    setStakedBalance('0.5');
    setTotalStaked('10.0');
    setRewardPool('1.0');
    setWinningProbability('5');
    setNotification("Demo mode enabled. This is a simulation and no real transactions will occur.");
  };

  // Load game data
  const loadGameData = async (game) => {
    try {
      // Get staked balance
      const balance = await game.getStakedBalance(account);
      setStakedBalance(ethers.formatEther(balance));
      
      // Get total staked
      const total = await game.totalStaked();
      setTotalStaked(ethers.formatEther(total));
      
      // Get reward pool
      const pool = await game.getRewardPool();
      setRewardPool(ethers.formatEther(pool));
      
      // Get winning probability
      const probability = await game.getWinningProbability(account);
      setWinningProbability(probability.toString());
      
      // Check if user is owner
      const owner = await game.owner();
      setIsOwner(owner.toLowerCase() === account.toLowerCase());
    } catch (error) {
      console.error("Error loading game data:", error);
      setError(error.message || "Failed to load game data");
    }
  };

  // Stake tokens
  const stake = async () => {
    if (demoMode) {
      setNotification("In demo mode: Staked " + stakeAmount + " DEV successfully (simulated)");
      setStakedBalance((parseFloat(stakedBalance) + parseFloat(stakeAmount)).toFixed(2));
      setTotalStaked((parseFloat(totalStaked) + parseFloat(stakeAmount)).toFixed(2));
      setRewardPool((parseFloat(rewardPool) + parseFloat(stakeAmount) / 10).toFixed(2));
      setWinningProbability(((parseFloat(stakedBalance) + parseFloat(stakeAmount)) * 100 / (parseFloat(totalStaked) + parseFloat(stakeAmount))).toFixed(0));
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Convert stake amount to wei
      const stakeAmountWei = ethers.parseEther(stakeAmount);
      
      // Stake tokens
      const tx = await gameContract.stake({ value: stakeAmountWei });
      setNotification("Staking tokens... Please wait for transaction confirmation.");
      
      // Wait for transaction confirmation
      await tx.wait();
      
      // Reload game data
      await loadGameData(gameContract);
      
      setNotification("Tokens staked successfully!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error staking tokens:", error);
      setError(error.message || "Failed to stake tokens");
      setIsLoading(false);
    }
  };

  // Unstake tokens
  const unstake = async () => {
    if (demoMode) {
      if (parseFloat(unstakeAmount) > parseFloat(stakedBalance)) {
        setError("Cannot unstake more than your staked balance");
        return;
      }
      setNotification("In demo mode: Unstaked " + unstakeAmount + " DEV successfully (simulated)");
      setStakedBalance((parseFloat(stakedBalance) - parseFloat(unstakeAmount)).toFixed(2));
      setTotalStaked((parseFloat(totalStaked) - parseFloat(unstakeAmount)).toFixed(2));
      setWinningProbability(parseFloat(stakedBalance) > 0 ? ((parseFloat(stakedBalance) - parseFloat(unstakeAmount)) * 100 / (parseFloat(totalStaked) - parseFloat(unstakeAmount))).toFixed(0) : "0");
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Convert unstake amount to wei
      const unstakeAmountWei = ethers.parseEther(unstakeAmount);
      
      // Unstake tokens
      const tx = await gameContract.unstake(unstakeAmountWei);
      setNotification("Unstaking tokens... Please wait for transaction confirmation.");
      
      // Wait for transaction confirmation
      await tx.wait();
      
      // Reload game data
      await loadGameData(gameContract);
      
      setNotification("Tokens unstaked successfully!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error unstaking tokens:", error);
      setError(error.message || "Failed to unstake tokens");
      setIsLoading(false);
    }
  };

  // Distribute reward
  const distributeReward = async () => {
    if (demoMode) {
      setNotification("In demo mode: Reward of " + rewardPool + " DEV distributed successfully (simulated)");
      setRewardPool("0");
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Distribute reward
      const tx = await gameContract.distributeReward();
      setNotification("Distributing reward... Please wait for transaction confirmation.");
      
      // Wait for transaction confirmation
      await tx.wait();
      
      // Reload game data
      await loadGameData(gameContract);
      
      setNotification("Reward distributed successfully!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error distributing reward:", error);
      setError(error.message || "Failed to distribute reward");
      setIsLoading(false);
    }
  };

  // Render
  return (
    <div className="App">
      <header className="App-header">
        <h1>Play-to-Earn Token Staking Game</h1>
        <p>Built on Polkadot Ecosystem (Moonbeam)</p>
      </header>
      
      <main className="App-main">
        {!account ? (
          <div className="connect-wallet">
            <button onClick={connectWallet} disabled={isLoading}>
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </button>
            <button onClick={enableDemoMode} className="demo-button">
              Try Demo Mode
            </button>
            <div className="network-info">
              <p>This application uses a smart contract deployed on Moonbase Alpha (Moonbeam Testnet).</p>
              <p>Please configure MetaMask with:</p>
              <ul>
                <li>Network Name: Moonbase Alpha</li>
                <li>RPC URL: https://rpc.api.moonbase.moonbeam.network</li>
                <li>Chain ID: 1287</li>
                <li>Currency Symbol: DEV</li>
              </ul>
            </div>
            {error && <p className="error">{error}</p>}
          </div>
        ) : (
          <div className="game-container">
            <div className="account-info">
              <p>Connected Account: {account}</p>
              <p>Network: {networkName || "Unknown"}</p>
              {demoMode && <p className="demo-badge">DEMO MODE</p>}
            </div>
            
            {!gameContract && !demoMode ? (
              <div className="connect-contract">
                <h2>Connect to Contract</h2>
                <div className="form-group">
                  <label>Contract Address:</label>
                  <input
                    type="text"
                    value={gameAddress}
                    onChange={(e) => setGameAddress(e.target.value)}
                    placeholder="Enter deployed contract address"
                  />
                </div>
                <button onClick={connectToContract} disabled={isLoading}>
                  {isLoading ? "Connecting..." : "Connect to Contract"}
                </button>
                <button onClick={() => connectToDeployedContract(signer)} className="primary-button">
                  Connect to Deployed Contract
                </button>
                <button onClick={enableDemoMode} className="demo-button">
                  Try Demo Mode Instead
                </button>
              </div>
            ) : (
              <div className="game-section">
                <h2>Game Actions</h2>
                
                <div className="game-info">
                  <div className="info-item">
                    <span>Your Staked Balance:</span>
                    <span>{stakedBalance} {demoMode ? "DEV" : "DEV"}</span>
                  </div>
                  <div className="info-item">
                    <span>Total Staked:</span>
                    <span>{totalStaked} {demoMode ? "DEV" : "DEV"}</span>
                  </div>
                  <div className="info-item">
                    <span>Reward Pool:</span>
                    <span>{rewardPool} {demoMode ? "DEV" : "DEV"}</span>
                  </div>
                  <div className="info-item">
                    <span>Your Winning Probability:</span>
                    <span>{winningProbability}%</span>
                  </div>
                </div>
                
                <div className="stake-actions">
                  <div className="stake">
                    <h3>Stake Tokens</h3>
                    <div className="form-group">
                      <label>Amount (DEV):</label>
                      <input
                        type="text"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                      />
                    </div>
                    <button onClick={stake} disabled={isLoading}>
                      {isLoading ? "Staking..." : "Stake"}
                    </button>
                  </div>
                  
                  <div className="unstake">
                    <h3>Unstake Tokens</h3>
                    <div className="form-group">
                      <label>Amount (DEV):</label>
                      <input
                        type="text"
                        value={unstakeAmount}
                        onChange={(e) => setUnstakeAmount(e.target.value)}
                      />
                    </div>
                    <button onClick={unstake} disabled={isLoading}>
                      {isLoading ? "Unstaking..." : "Unstake"}
                    </button>
                  </div>
                </div>
                
                {(isOwner || demoMode) && (
                  <div className="distribute-reward">
                    <h3>Distribute Reward</h3>
                    <button onClick={distributeReward} disabled={isLoading || parseFloat(rewardPool) === 0}>
                      {isLoading ? "Distributing..." : "Distribute Reward"}
                    </button>
                    {parseFloat(rewardPool) === 0 && (
                      <p className="info">
                        No rewards available to distribute
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {notification && <div className="notification">{notification}</div>}
            {error && <div className="error">{error}</div>}
          </div>
        )}
      </main>
      
      <footer className="App-footer">
        <p>© 2025 Play-to-Earn Token Staking Game | Built for Polkadot Asset Hub Hackathon</p>
        <p>
          <a href="https://github.com/p-chandler/polkadot-staking-game" target="_blank" rel="noopener noreferrer">GitHub Repository</a> | 
          <a href="https://moonbase.moonscan.io/address/0x7B3ad466410e29Aa6C84e8621a9dDefab8DD9B9d" target="_blank" rel="noopener noreferrer">View Contract on Block Explorer</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
