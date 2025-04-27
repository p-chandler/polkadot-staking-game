// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title StakingGame
 * @dev A simple Play-to-Earn Token Staking Game for Polkadot Asset Hub
 * Users can stake tokens to participate in a lottery/reward system
 * The more tokens staked, the higher chance of winning
 */
contract StakingGame {
    // Token name and symbol
    string public name = "Staking Game Token";
    string public symbol = "SGT";
    
    // Mapping of address to staked amount
    mapping(address => uint256) public stakedBalances;
    
    // Total staked amount
    uint256 public totalStaked;
    
    // Minimum stake amount
    uint256 public constant MIN_STAKE = 1 ether / 100; // 0.01 ether
    
    // Reward pool
    uint256 public rewardPool;
    
    // Last reward time
    uint256 public lastRewardTime;
    
    // Reward interval (24 hours in seconds)
    uint256 public constant REWARD_INTERVAL = 86400;
    
    // Events
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardDistributed(address indexed winner, uint256 amount);
    
    constructor() {
        lastRewardTime = block.timestamp;
    }
    
    /**
     * @dev Stake tokens to participate in the game
     */
    function stake() external payable {
        require(msg.value >= MIN_STAKE, "Stake amount too small");
        
        // Update staked balance
        stakedBalances[msg.sender] += msg.value;
        
        // Update total staked
        totalStaked += msg.value;
        
        // Add 10% of stake to reward pool
        uint256 rewardContribution = msg.value / 10;
        rewardPool += rewardContribution;
        
        emit Staked(msg.sender, msg.value);
        
        // Check if reward should be distributed
        if (block.timestamp >= lastRewardTime + REWARD_INTERVAL) {
            distributeReward();
        }
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
    function distributeReward() public {
        require(block.timestamp >= lastRewardTime + REWARD_INTERVAL, "Reward interval not reached");
        require(totalStaked > 0, "No stakes to distribute reward");
        require(rewardPool > 0, "No rewards to distribute");
        
        // Update last reward time
        lastRewardTime = block.timestamp;
        
        // Select a winner based on weighted random selection
        address winner = selectWinner();
        
        // Transfer reward to winner
        uint256 reward = rewardPool;
        rewardPool = 0;
        payable(winner).transfer(reward);
        
        emit RewardDistributed(winner, reward);
    }
    
    /**
     * @dev Select a winner based on weighted random selection
     * The probability of winning is proportional to the staked amount
     * @return winner The address of the winner
     */
    function selectWinner() internal view returns (address) {
        // Generate a random number between 0 and totalStaked
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % totalStaked;
        
        // Find the winner based on the random number
        uint256 cumulativeStake = 0;
        address currentWinner = address(0);
        
        // Iterate through all stakers
        // Note: This is a simplified implementation for demonstration purposes
        // In a production environment, you would use a more efficient algorithm
        address[] memory stakers = getStakers();
        for (uint256 i = 0; i < stakers.length; i++) {
            address staker = stakers[i];
            cumulativeStake += stakedBalances[staker];
            
            if (randomNumber < cumulativeStake) {
                currentWinner = staker;
                break;
            }
        }
        
        // If no winner is found (should not happen), return the first staker
        if (currentWinner == address(0) && stakers.length > 0) {
            currentWinner = stakers[0];
        }
        
        return currentWinner;
    }
    
    /**
     * @dev Get all stakers
     * @return Array of staker addresses
     */
    function getStakers() internal view returns (address[] memory) {
        // Count the number of stakers
        uint256 stakerCount = 0;
        for (uint256 i = 0; i < 100; i++) { // Arbitrary limit for demonstration
            address potentialStaker = address(uint160(i + 1));
            if (stakedBalances[potentialStaker] > 0) {
                stakerCount++;
            }
        }
        
        // Create an array of stakers
        address[] memory stakers = new address[](stakerCount);
        uint256 index = 0;
        for (uint256 i = 0; i < 100; i++) { // Arbitrary limit for demonstration
            address potentialStaker = address(uint160(i + 1));
            if (stakedBalances[potentialStaker] > 0) {
                stakers[index] = potentialStaker;
                index++;
            }
        }
        
        return stakers;
    }
    
    /**
     * @dev Get the current reward pool
     * @return Current reward pool amount
     */
    function getRewardPool() external view returns (uint256) {
        return rewardPool;
    }
    
    /**
     * @dev Get the time until next reward distribution
     * @return Time in seconds until next reward
     */
    function getTimeUntilNextReward() external view returns (uint256) {
        uint256 nextRewardTime = lastRewardTime + REWARD_INTERVAL;
        if (block.timestamp >= nextRewardTime) {
            return 0;
        }
        return nextRewardTime - block.timestamp;
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
