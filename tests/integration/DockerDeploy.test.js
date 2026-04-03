const { expect } = require("chai");
const { execFileSync } = require("child_process");
const fs = require("fs");
const { ethers, network } = require("hardhat");
const path = require("path");

const describeIfDocker = ["docker", "devnet"].includes(network.name) ? describe : describe.skip;
const deployedJsonPath = path.resolve(process.cwd(), ".data", "deployed.json");
const verificationReportPath = path.resolve(process.cwd(), ".data", `verification-report.${network.name}.json`);

async function createFundedWallet(owner) {
  const wallet = ethers.Wallet.createRandom().connect(ethers.provider);
  await (await owner.sendTransaction({
    to: wallet.address,
    value: ethers.utils.parseEther("10"),
  })).wait();
  return wallet;
}

function runHardhatScript(scriptPath) {
  execFileSync("npx", ["hardhat", "run", "--network", network.name, scriptPath], {
    cwd: process.cwd(),
    stdio: "pipe",
  });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

describeIfDocker("[INTEGRATION] External RPC workflow", function () {
  this.timeout(120000);

  it("deploys and exercises contracts over the external RPC", async function () {
    const [deployer] = await ethers.getSigners();
    const agent = await createFundedWallet(deployer);
    const user = await createFundedWallet(deployer);
    const providerNetwork = await ethers.provider.getNetwork();

    expect(providerNetwork.chainId).to.equal(1337);

    const mac = await (await ethers.getContractFactory("MAC", deployer)).deploy();
    await mac.deployed();

    await (await mac.agentAdd(agent.address)).wait();
    expect(await mac.isAgent(agent.address)).to.equal(true);

    const uct = await (await ethers.getContractFactory("UserCreditToken", deployer)).deploy();
    await uct.deployed();

    await (await uct.agentAdd(agent.address)).wait();
    await (await uct.connect(agent).mint(user.address, 5)).wait();

    expect((await uct.balanceOf(user.address)).toString()).to.equal("5");
  });

  it("runs deploy.js and writes a network-aware deployment record", async function () {
    try {
      fs.unlinkSync(deployedJsonPath);
    } catch (error) {
      // ignore missing file
    }

    runHardhatScript("scripts/deploy.js");

    const deploymentRecord = readJson(deployedJsonPath);
    expect(deploymentRecord._meta.network).to.equal(network.name);
    expect(deploymentRecord._meta.chainId).to.equal(1337);
    expect(deploymentRecord.contracts.mac.address).to.match(/^0x[a-fA-F0-9]{40}$/);
    expect(deploymentRecord.contracts.userCreditToken.address).to.match(/^0x[a-fA-F0-9]{40}$/);
    expect(deploymentRecord._meta.bootstrapAgents).to.have.length.greaterThan(0);

    const bootstrapAgent = deploymentRecord._meta.bootstrapAgents[0];
    const uct = await ethers.getContractAt(
      "UserCreditToken",
      deploymentRecord.contracts.userCreditToken.address
    );
    expect((await uct.agents(bootstrapAgent.address)).active).to.equal(true);
  });

  it("runs verifier.js in local dry-run mode for external RPCs", async function () {
    if (!fs.existsSync(deployedJsonPath)) {
      runHardhatScript("scripts/deploy.js");
    }

    runHardhatScript("scripts/verifier.js");

    const report = readJson(verificationReportPath);
    expect(report._meta.network).to.equal(network.name);
    expect(report._meta.localMode).to.equal(true);
    expect(report.results).to.have.length(2);
    expect(report.results.every((entry) => entry.status === "validated-local")).to.equal(true);
  });
});