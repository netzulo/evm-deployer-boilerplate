const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

const LOCAL_NETWORKS = new Set(["hardhat", "devnet", "docker"]);

function getDeploymentFilePath() {
  const candidates = [
    process.env.DEPLOYMENTS_FILE,
    path.resolve(__dirname, `../.data/deployed.${hre.network.name}.json`),
    path.resolve(__dirname, "../.data/deployed.json"),
  ].filter(Boolean);

  const filePath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!filePath) {
    throw new Error("No deployment record was found. Run the deploy script first.");
  }

  return filePath;
}

function loadDeploymentRecord() {
  const filePath = getDeploymentFilePath();
  const parsed = JSON.parse(fs.readFileSync(filePath, "utf8").trim());
  if (parsed.contracts) {
    return { filePath, meta: parsed._meta || {}, contracts: parsed.contracts };
  }

  return { filePath, meta: {}, contracts: parsed };
}

async function verifyLocalContract(name, deployment) {
  const code = await hre.ethers.provider.getCode(deployment.address);
  if (!code || code === "0x") {
    throw new Error(`No bytecode found at ${deployment.address} for ${name}`);
  }

  return {
    name,
    address: deployment.address,
    contract: deployment.verify || null,
    status: "validated-local",
  };
}

async function verifyRemoteContract(name, deployment) {
  await hre.run("verify:verify", {
    network: hre.network.name,
    address: deployment.address,
    contract: deployment.verify,
    contractAbi: deployment.abi,
    constructorArguments: deployment.args || [],
  });

  return {
    name,
    address: deployment.address,
    contract: deployment.verify || null,
    status: "verified",
  };
}

function writeVerificationReport(report) {
  const outputPaths = [
    path.resolve(__dirname, "../.data/verification-report.json"),
    path.resolve(__dirname, `../.data/verification-report.${hre.network.name}.json`),
  ];

  outputPaths.forEach((outputPath) => {
    fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(`[verifier] Wrote report to ${outputPath}`);
  });
}

async function main() {
  const startAt = Number(new Date());
  const networkInfo = await hre.ethers.provider.getNetwork();
  const isLocalVerification = LOCAL_NETWORKS.has(hre.network.name) || Number(networkInfo.chainId) === 1337;
  const { filePath, meta, contracts } = loadDeploymentRecord();
  const results = [];

  // Verify contracts
  for (const [name, deployment] of Object.entries(contracts)) {
    console.debug("[verifier]:", name, deployment.address);
    if (!deployment.verify) {
      results.push({
        name,
        address: deployment.address,
        contract: null,
        status: "skipped-no-verify-config",
      });
      continue;
    }

    try {
      const result = isLocalVerification
        ? await verifyLocalContract(name, deployment)
        : await verifyRemoteContract(name, deployment);
      results.push(result);
    } catch (err) {
      results.push({
        name,
        address: deployment.address,
        contract: deployment.verify || null,
        status: "failed",
        error: err.message,
      });
    }
  }

  const failures = results.filter((result) => result.status === "failed");
  const report = {
    _meta: {
      network: hre.network.name,
      chainId: Number(networkInfo.chainId),
      sourceFile: filePath,
      generatedAt: new Date().toISOString(),
      localMode: isLocalVerification,
      deploymentMeta: meta,
    },
    results,
  };

  writeVerificationReport(report);
  console.log("Duration: ", (Number(new Date()) - startAt) / 1000);

  if (failures.length > 0) {
    throw new Error(`Verification failed for ${failures.length} contract(s)`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
