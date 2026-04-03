const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

const getABI = (_path, _file) => {
  try {
    const dir = path.resolve(
      __dirname,
      `../.data/artifacts/contracts/${_path}${_file}.sol/${_file}.json`
    );
    const file = fs.readFileSync(dir, "utf8");
    return JSON.parse(file).abi;
  } catch (e) {
    throw new Error(`Unable to load ABI for ${_path}${_file}: ${e.message}`);
  }
};

const getContracts = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const networkInfo = await hre.ethers.provider.getNetwork();
  const user = hre.ethers.Wallet.createRandom();
  const agents = [
    {name: "agent-ia-pdf-manager", addr: user.address},
  ];
  const mac = await (await hre.ethers.getContractFactory("MAC")).deploy();
  await mac.deployed();
  const uct = await (await hre.ethers.getContractFactory("UserCreditToken")).deploy();
  await uct.deployed();

  // Grant roles - backend
  for (const agent of agents) {
    await (await uct.agentAdd(agent.addr)).wait();
    console.log(`[deploy] ${agent.name}: Grant as AGENT for backend=${agent.addr}`);
  }
  return {
    _meta: {
      network: hre.network.name,
      chainId: Number(networkInfo.chainId),
      deployer: deployer.address,
      deployedAt: new Date().toISOString(),
      bootstrapAgents: agents.map(({ name, addr }) => ({ name, address: addr })),
    },
    contracts: {
      mac: {
        verify: "contracts/permissions/MAC.sol:MAC",
        address: mac.address,
        abi: await getABI("permissions/", "MAC"),
      },
      userCreditToken: {
        verify: "contracts/tokens/UserCreditToken.sol:UserCreditToken",
        address: uct.address,
        abi: await getABI("tokens/", "UserCreditToken"),
      },
    },
  };
};

async function main() {
  const startAt = Number(new Date());
  // We get the contract to deploy
  const deploymentRecord = await getContracts();
  // Write JSON {[ADDRs+ABIs]} to file
  const _paths = [
    `${__dirname}/../.data/deployed.json`, // for local
    `${__dirname}/../.data/deployed.${hre.network.name}.json`,
  ];
  _paths.forEach((p) => {
    try { fs.unlinkSync(p); } catch (error) {/* silenced errors */}
    console.log("[deploy] Write deployment record to:", p);
    fs.writeFileSync(p, `${JSON.stringify(deploymentRecord, null, 2)}\n`);
  });
  console.log("[deploy] Duration: ", (Number(new Date()) - startAt) / 1000);
  // TODO: next steps at postdeploy.js
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
