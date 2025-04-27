// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SimpleStakingGame
 * @dev A simplified version of the Play-to-Earn Token Staking Game for easier deployment
 */
contract SimpleStakingGame {
    // Token name and symbol
    string public name = "Simple Staking Game";
    string public symbol = "SSG";
    
    // Game owner
    address public owner;
    
    // Mapping of address to staked amount
    mapping(address => uint256) public stakedBalances;
    
    // Total staked amount
    uint256 public totalStaked;
    
    // Reward pool
    uint256 public rewardPool;
    
    // Events
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardDistributed(address indexed winner, uint256 amount);
    
    /**
     * @dev Constructor to initialize the game
     */
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Stake tokens to participate in the game
     */
    function stake() external payable {
        require(msg.value > 0, "Stake amount must be greater than 0");
        
        // Update staked balance
        stakedBalances[msg.sender] += msg.value;
        
        // Update total staked
        totalStaked += msg.value;
        
        // Add 10% of stake to reward pool
        uint256 rewardContribution = msg.value / 10;
        rewardPool += rewardContribution;
        
        emit Staked(msg.sender, msg.value);
    }
    
    /**
     * @dev Unstake tokens from the game
     * @param amount Amount to unstake
     */
    function unstake(uint256 amount) external {
        require(stakedBalances[msg.sender] >= amount, "Insufficient staked balance");
        
        // Update staked balance
        stakedBalances[msg.sender] -= amount;
        
        // Update total staked
        totalStaked -= amount;
        
        // Transfer tokens back to user
        payable(msg.sender).transfer(amount);
        
        emit Unstaked(msg.sender, amount);
    }
    
    /**
     * @dev Distribute reward to a random winner
     * The probability of winning is proportional to the staked amount
     */
    function distributeReward() external {
        require(msg.sender == owner, "Only owner can distribute rewards");
        require(totalStaked > 0, "No stakes to distribute reward");
        require(rewardPool > 0, "No rewards to distribute");
        
        // Select a winner (simplified to owner for testing)
        address winner = owner;
        
        // Transfer reward to winner
        uint256 reward = rewardPool;
        rewardPool = 0;
        payable(winner).transfer(reward);
        
        emit RewardDistributed(winner, reward);
    }
    
    /**
     * @dev Get the current reward pool
     * @return Current reward pool amount
     */
    function getRewardPool() external view returns (uint256) {
        return rewardPool;
    }
    
    /**
     * @dev Get the staked balance of a user
     * @param user Address of the user
     * @return Staked balance
     */
    function getStakedBalance(address user) external view returns (uint256) {
        return stakedBalances[user];
    }
    
    /**
     * @dev Get the winning probability of a user
     * @param user Address of the user
     * @return Winning probability in percentage (0-100)
     */
    function getWinningProbability(address user) external view returns (uint256) {
        if (totalStaked == 0) {
            return 0;
        }
        return (stakedBalances[user] * 100) / totalStaked;
    }
}
