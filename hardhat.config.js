require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-chai-matchers");
require('solidity-coverage');
require("@nomiclabs/hardhat-solhint");
require('hardhat-watcher');
require("hardhat-contract-sizer");

const fs = require("fs");
const { dirname } = require('path');
console.log(`[hardhat-config][0/3] loading ${dirname(__filename)}`);
// Data directory for persistent data
if (!fs.existsSync(".data")) {
  console.log('[hardhat-config] creating .data directory');
  fs.mkdirSync(".data");
}
console.log(`[hardhat-config][1/3] ready to use ${dirname(__filename)}/.data directory`);

const envFileName = ".env";
let secret = null; 
try {
  secret = fs.readFileSync(envFileName).toString().trim();
} catch (e) {
  // ignore, next step will create it
}
const { ethers } = require("ethers");
if(!secret) {
  // create with ethers
  const w = ethers.Wallet.createRandom();
  secret = w.privateKey;
  fs.writeFileSync(envFileName, secret);
  console.log(`[hardhat-config][2/3] created account : ${w.address}`);
} else {
  const w = new ethers.Wallet(secret);
  console.log(`[hardhat-config][2/3] loaded account : ${w.address}`);
}
console.log(`[hardhat-config][3/3] secret loaded from ${envFileName}`);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths: {
    sources: "./contracts",
    tests: "./tests",
    cache: "./.data/cache",
    artifacts: "./.data/artifacts",
  },
  settings: {
    optimizer: {
      enabled: true, runs: 200,
    },
  },
  watcher: {
    compilation: {
      tasks: [
        'clean',
        { command: 'check', params: { } },
        { command: 'compile', params: { quiet: true } },
      ],
      files: ['./contracts'],
      verbose: true,
      clearOnStart: true,
      start: 'echo \"[evm-deployer] SmartContract watcher started/restarted\"',
    },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
    unit: 'B',
  },
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: [ 
        {
          privateKey: secret,
          balance: ethers.utils.parseEther("1000000000").toString() 
        }
        // add more accounts here
      ],
      mining: {
        auto: true,
        interval: [1000, 4000], // comment to disable mining
      },
    },
    devnet: {
      url: "http://localhost:8545",
      chainId: 1337,
      accounts: [secret],
    },
    docker: {
      url: "http://localhost:9545",
      chainId: 1337,
      accounts: [secret],
    },
    ethereum: {
      url: `https://mainnet.infura.io/v3/`,
      accounts: [secret],
      chainId: 1,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/`,
      accounts: [secret],
      chainId: 5,
    },
    polygon: {
      url: `https://polygon-rpc.com`,
      accounts: [secret],
      chainId: 137,
    },
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com`,
      accounts: [secret],
      chainId: 80001,
    },
    bsc: {
      url: `https://bsc-dataseed.binance.org`,
      accounts: [secret],
      chainId: 56,
    },
    bscTestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [secret],
      chainId: 97,
    },
    arbitrum: {
      url: `https://arb1.arbitrum.io/rpc`,
      accounts: [secret],
      chainId: 42161,
    },
    arbitrumGoerli: {
      url: `https://goerli-rollup.arbitrum.io/rpc`,
      accounts: [secret],
      chainId: 421613,
    },
    optimism: {
      url: `https://mainnet.optimism.io`,
      accounts: [secret],
      chainId: 10,
    },
    optimismGoerli: {
      url: `https://goerli.optimism.io`,
      accounts: [secret],
      chainId: 420,
    },
    coinbase: {
      url: `https://rpc.coinbasecloud.net`,
      accounts: [secret],
      chainId: 42220,
    },
  },
  etherscan: {
    apiKey: {
      devnet: "YourApiKey",
      ethereum: "YourApiKey",
      goerli: "YourApiKey",
      polygon: "YourApiKey",
      mumbai: "YourApiKey",
      bsc: "YourApiKey",
      bscTestnet: "YourApiKey",
      arbitrum: "YourApiKey",
      arbitrumGoerli: "YourApiKey",
      optimism: "YourApiKey",
      optimismGoerli: "YourApiKey",
      coinbase: "YourApiKey",
    },
    customChains: [
      {
        network: "devnet",
        chainId: 1337,
        urls: {
          apiURL: "http://localhost:4000/api",
          browserURL: "http://localhost:4000",
        },
      },
      {
        network: "ethereum",
        chainId: 1,
        urls: {
          apiURL: "https://api.etherscan.io/api",
          browserURL: "https://etherscan.io",
        },
      },
      {
        network: "goerli",
        chainId: 5,
        urls: {
          apiURL: "https://api-goerli.etherscan.io/api",
          browserURL: "https://goerli.etherscan.io",
        },
      },
      {
        network: "polygon",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com/api",
          browserURL: "https://polygonscan.com",
        },
      },
      {
        network: "mumbai",
        chainId: 80001,
        urls: {
          apiURL: "https://api-testnet.polygonscan.com/api",
          browserURL: "https://mumbai.polygonscan.com",
        },
      },
      {
        network: "bsc",
        chainId: 56,
        urls: {
          apiURL: "https://api.bscscan.com/api",
          browserURL: "https://bscscan.com",
        },
      },
      {
        network: "bscTestnet",
        chainId: 97,
        urls: {
          apiURL: "https://api-testnet.bscscan.com/api",
          browserURL: "https://testnet.bscscan.com",
        },
      },
      {
        network: "arbitrum",
        chainId: 42161,
        urls: {
          apiURL: "https://api.arbiscan.io/api",
          browserURL: "https://arbiscan.io",
        },
      },
      {
        network: "arbitrumGoerli",
        chainId: 421613,
        urls: {
          apiURL: "https://api-goerli.arbiscan.io/api",
          browserURL: "https://goerli.arbiscan.io",
        },
      },
      {
        network: "optimism",
        chainId: 10,
        urls: {
          apiURL: "https://api-optimistic.etherscan.io/api",
          browserURL: "https://optimistic.etherscan.io",
        },
      },
      {
        network: "optimismGoerli",
        chainId: 420,
        urls: {
          apiURL: "https://api-goerli-optimistic.etherscan.io/api",
          browserURL: "https://goerli-optimistic.etherscan.io",
        },
      },
      {
        network: "coinbase",
        chainId: 42220,
        urls: {
          apiURL: "https://explorer.coinbasecloud.io/api",
          browserURL: "https://explorer.coinbasecloud.io",
        },
      },
    ],
  },
};
