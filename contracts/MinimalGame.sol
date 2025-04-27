// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MinimalGame {
    string public name = "Minimal Game";
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    function stake() external payable {
        // Just accept the payment
    }
    
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
