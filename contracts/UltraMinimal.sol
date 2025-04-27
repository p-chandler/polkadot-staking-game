// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title UltraMinimal
 * @dev An ultra-minimal contract for Moonbase Alpha deployment
 */
contract UltraMinimal {
    string public name = "Minimal";
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    function getValue() public pure returns (uint256) {
        return 42;
    }
}
