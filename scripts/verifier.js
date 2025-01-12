const hre = require("hardhat");
const fs = require("fs")


async function main() {
  const startAt = Number(new Date());
  const contracts = JSON.parse(fs.readFileSync(`${__dirname}/../.data/deployed.json`).toString().trim())
  // Verify contracts
  for (const [name, {verify, address, abi, args}] of Object.entries(contracts)) {
    console.debug("[verifier]: ", name, address)
    if (!verify) {
      console.debug("[verifier]: NO-VERIFY, ", name, address)
      continue
    }
    try {
      await hre.run("verify:verify", {
        network: hre.network.name,
        address: address,
        contract: verify,
        contractAbi: abi,
        constructorArguments: args || [],
      });
    } catch (err) {
      console.debug("[verifier] ERROR: ", err.message)
    }
  }
  console.log("Duration: ", (Number(new Date()) - startAt) / 1000)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
