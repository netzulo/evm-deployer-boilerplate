// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./../permissions/MAC.sol";

contract UserCreditToken is ERC20, ERC20Burnable, Pausable, MAC {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("UserCreditToken", "UCT") {
        _setupRole(PAUSER_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }

    function agentAdd(address agent) override public onlyAgent {
        super.agentAdd(agent);
        _grantRole(PAUSER_ROLE, agent);
        _grantRole(MINTER_ROLE, agent);
    }

    function agentDel(address agent) override public onlyAgent {
        super.agentDel(agent);
        _revokeRole(PAUSER_ROLE, agent);
        _revokeRole(MINTER_ROLE, agent);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyAgent {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}
