// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hardhat = require("hardhat");
const fs = require("fs")


async function generateWallets(numWallets) {
  const wallets = [];
  for (let i = 0; i < numWallets; i++) {
    const wallet = ethers.Wallet.createRandom();
    wallets.push({
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
    });
    console.log(`[wallet][${i}/${numWallets}] ${wallet.address}`);
  }
  return wallets;
}

async function executeInGroups(fn, divisions, interval) {
  const promises = Array.from({ length: divisions }, (_, index) =>
    new Promise((resolve) => setTimeout(resolve, interval * index))
  );
  await Promise.all(promises.map(() => fn()));
}

const config = require("../hardhat.config")

async function main() {
  const startAt = Number(new Date());
  // load user address from config
  const privKey = config.networks.goerli.accounts.at(0)
  const user = new hardhat.ethers.Wallet(privKey).address

  const [owner] = await hardhat.ethers.getSigners();
  /// SETUP
  // execute 1000 txns in 1 sec
  const divisions = 100;
  const interval = 10;
  const wallets = await generateWallets(divisions);
  const provider = new hardhat.ethers.providers.JsonRpcProvider(config.networks.goerli.url)
  const contracts = JSON.parse(fs.readFileSync(`${__dirname}/../.data/deployed.json`).toString().trim())
  const exampleErc20 = (new hardhat.ethers.Contract(
    contracts.exampleErc20.address, contracts.exampleErc20.abi, provider)).connect(owner)
  // send 0.00001 ETH to user
  try {
    const value = hardhat.ethers.utils.parseEther("0.00001");
    const txn = await owner.sendTransaction({to: user, value: value}) //.encodeABI()
    console.log(`[send-eth] txn: ${value} `, txn.transactionHash);
  } catch (err) {
    console.error(err)
  }
  // send 100 ExampleERC20 token's to user every 1 sec 1000 times
  await executeInGroups(async () => {
    wallets.forEach(async (wallet) => {
      try {
        const value = "100000000000000000000";
        const txn = await exampleErc20.mint(wallet, value);
        console.log(`[erc20-mint] txn: ${100}`, txn.transactionHash);
      } catch (err) {
        console.error('[erc20-error] ', err)
      }
    });
  }
  , divisions, interval);
  console.log(`[stress] ${divisions} txns in ${interval} ms`);
  console.log(`[stress] total time: ${Number(new Date()) - startAt} ms`);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
