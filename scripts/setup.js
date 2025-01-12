// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs")

/**
 * This scripts use evm_snapshot to create a snapshot of the current state of the blockchain,
 * allow PAUSE and RESUME your data and exeucte tests down handled scenarios.
 */
async function main() {
  const startAt = Number(new Date());
  const getBlock = async () => await hre.ethers.provider.getBlockNumber()
  const getAutomine = async () => await hre.network.provider.request({
    method: "hardhat_getAutomine",
    params: [],
  });
  const setAutomine = async (value=true) => await hre.network.provider.request({
    method: "evm_setAutomine",
    params: [value],
  });
  const setIntervalMining = async (value=0) => await hre.network.provider.request({
    method: "evm_setIntervalMining",
    params: [15000],
  });
  const pendingBlock = async () => await network.provider.send("eth_getBlockByNumber", [
    "pending",
    false,
  ]);
  try {
    console.debug("[setup]: action=mining_mode_setup")
    console.debug("[setup]: blockNumber=", await getBlock())
    console.debug("[setup]: changing autoMineMode=", (await getAutomine()))
    await setAutomine(false)
    await setIntervalMining(0)
    console.debug("[setup]: changed autoMineMode=", (await getAutomine()))

    console.debug("[setup]: action=manual_mining_mode")
    while (true) {
      // get all txns pending
      const txnsPending = (await pendingBlock()).transactions
      // if not max txns per block, mine all txns
      if (txnsPending.length <= 100) {
        console.debug("[setup]: mining tnxs=", txnsPending.length)
        await network.provider.send("evm_mine", []);
      } else { // else mine max txns per block
        console.debug("[setup]: action=mine_max_txns_per_block")
        const maxTxnsPerBlock = 100
        const txnsToMine = txnsPending.slice(0, maxTxnsPerBlock)
        console.debug("[setup]: txnsToMine=", txnsToMine.length)
        // wait for 100 txns to mine
        if (txnsToMine.length <= maxTxnsPerBlock) {
          console.debug("[setup]: action=mine")
          await network.provider.send("evm_mine", []);
        }
      }
      // wait 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 350));
    }


  } catch (err) {
    console.debug("[setup] ERROR: ", err.message)
  }
  console.log("[setup] Duration: ", (Number(new Date()) - startAt) / 1000)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
