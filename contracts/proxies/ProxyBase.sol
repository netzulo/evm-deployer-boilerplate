// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Proxy {
    address public implementation;
    address public admin;

    constructor(address _implementation) {
        implementation = _implementation;
        admin = msg.sender;
    }

    fallback() external payable {
        (bool success, ) = implementation.delegatecall(msg.data);
        require(success);
    }

    function upgrade(address _newImplementation) external {
        require(msg.sender == admin, "Not admin");
        implementation = _newImplementation;
    }
}
