// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { utils, providers, Wallet, Contract } = require("ethers")
const fs = require("fs")
const path = require("path")

const getABI = (_path, _file) => {
  try {
    const dir = path.resolve(
      __dirname,`../.data/artifacts/contracts/${_path}${_file}.sol/${_file}.json`)
    const file = fs.readFileSync(dir, "utf8")
    return (JSON.parse(file)).abi
  } catch (e) {
    console.log(`e`, e)
  }
}

const getContracts = async () => {
  const user = hre.ethers.Wallet.createRandom()
  const agents = [
    {name: "agent-ia-pdf-manager", addr: user.address},
  ]
  const mac = await (await hre.ethers.getContractFactory("MAC")).deploy()
  const uct = await (await hre.ethers.getContractFactory("UserCreditToken")).deploy()

  // Grant roles - backend
  for (const agent of agents) {
    await uct.agentAdd(agent.addr)
    console.log(`[deploy] ${agent.name}: Grant as AGENT for backend=${agent.addr}`)
  }
  return {
    // NOT NEED cause UserCreditToken implements MAC
    mac: {
     verify: 'contracts/permissions/MAC.sol:MAC',
     address: mac.address, abi: await getABI('permissions/', 'MAC')
    },
    userCreditToken: {
     verify: 'contracts/tokens/UserCreditToken.sol:UserCreditToken',
     address: uct.address, abi: await getABI('tokens/', 'UserCreditToken')
    },
  }
}

async function main() {
  const startAt = Number(new Date());
  // We get the contract to deploy
  const addrs = await getContracts()
  // Write JSON {[ADDRs+ABIs]} to file
  const _paths = [
    `${__dirname}/../.data/deployed.json`, // for local
    // add more paths here...
  ]
  _paths.map((p)=>{
    try { fs.unlinkSync(p) } catch (error) {/* silenced errors */}
    console.log('[deploy] Write JSON {[ADDRs+ABIs]} to:', p)
    fs.writeFileSync(p, JSON.stringify(addrs))
  })
  console.log("[deploy] Duration: ", (Number(new Date()) - startAt) / 1000)
  // TODO: next steps at postdeploy.js
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
