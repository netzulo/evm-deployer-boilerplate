// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title MAC - Managed Access Control
 * @dev MAC is a contract for managing addresses assigned to a Role.
 *     It is used for managing access to the current system by a contract.
 */
contract MAC is AccessControl {

  bytes32 public constant AGENT_ROLE = keccak256("AGENT_ROLE");

  struct AgentInfo {
    bool active;
    uint256 createdAt;
  }

  mapping(address => AgentInfo) public agents;
  uint public agentsTotal = 0;

  constructor() {
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(AGENT_ROLE, msg.sender);
    // deployer is an agent but not tracked, to bypass modifier
    agents[msg.sender] = AgentInfo(true, block.timestamp);
  }

  function isAgent(address agent) public view onlyAgent returns (bool) {
    return agents[agent].createdAt > 0;
  }

  function agentAdd(address agent) virtual public onlyAgent {
    require(isAgent(agent) == false, "MAC: agent already exists");
    grantRole(AGENT_ROLE, agent);
    agents[agent] = AgentInfo(true, block.timestamp);
    agentsTotal++;
  }

  function agentDel(address agent) virtual public onlyAgent {
    require(isAgent(agent) == true, "MAC: agent does not exist");
    revokeRole(AGENT_ROLE, agent);
    agents[agent].active = false;
  }

  modifier onlyAgent() {
    require(hasRole(AGENT_ROLE, msg.sender), "MAC: caller is not an agent");
    _;
  }

  fallback() external virtual {}
}