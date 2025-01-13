# EVM Deployer Boilerplate 🚀

Welcome to **EVM Deployer Boilerplate**! This repository provides a base framework to help you easily deploy EVM across various platforms, utilizing automation, modular configurations, and integration with blockchain ecosystems for an enhanced deployment experience.

---

## 🌟 Features

- **Multi-Network Compatibility**:  Connect and deploy contracts seamlessly to major blockchain networks such as Ethereum, Arbitrum, Polygon, Binance Smart Chain, Optimism, and more. Includes support for test networks like Goerli and Mumbai for staging environments.

- **Modular & Customizable Setup**: Easily configure contract paths, artifacts, and testing directories. The boilerplate is designed to adapt to various deployment needs and environments.

- **Automated Deployment & Verification**: Save time with predefined scripts for deploying and verifying contracts on multiple networks using a single command.

- **Real-Time Contract Monitoring**: Leverage the watcher feature to automatically detect changes in contracts and trigger recompilation, ensuring a smooth development workflow.

- **Smart Contract Optimization**: Built-in Solidity optimizer and contract sizer ensure your contracts are efficient and fit within network size limits.

- **Comprehensive Testing & Coverage**: Includes tools for writing robust tests and measuring code coverage, ensuring high-quality smart contracts.

- **Preconfigured Accounts & Local Networks**: Local networks (`hardhat` and `devnet`) come with preloaded accounts and customizable mining settings for testing diverse scenarios.

- **Blockchain Explorer Integration**: Verify your contracts directly on explorers like Etherscan, Polygonscan, and more, with support for custom chains and APIs.

- **Cross-Platform Deployment**: This boilerplate is compatible with AWS, Azure, Google Cloud, and self-hosted environments, making it suitable for any infrastructure setup.

---

## 💡 Smart Contracts Examples

The deployment process incorporates a *smarts contracts* system designed to enhance both the economic and credibility aspects:

- [ ] **Lending & Borrowing Protocols**: Develop integrations for Smart contract deployment financing using decentralized lending.
- [ ] **Decentralized Exchanges (DEXs)**: Facilitate the trade of tokens and resources within the ecosystem using built-in marketplace utilities.
- [ ] **Yield Farming & Staking**: Enable users to earn rewards by staking tokens or providing liquidity for deployment transactions.
- [ ] **Decentralized Insurance**: Offer protection for Smart contract deployments through tokenized insurance pools.
- [ ] **Tokenized Governance**: Allow token holders to participate in governance decisions, including deployment prioritization or ecosystem upgrades.
- [ ] **Asset Tokenization**: Tokenize deployment configurations or resources to trade as unique digital assets.
- [ ] **Cross-Chain Solutions**: Implement interoperability for deployments across multiple blockchain networks.
- [ ] **Play-to-Earn (P2E) Models**: Introduce gamified mechanics, allowing users to earn rewards for participating in deployment-related activities.

| # | Contract Name | Description |
|---|---------------|-------------|
| ✔️ | `MAC.sol`     | **Managed Access Control**: A contract that manages access control allowing external backend manage the contract. |
| ✔️ | `UserCreditToken.sol` | **User Credit Token**: An ERC-20 token contract that provides credit for deployment transactions and use MAC permissions. |


💰 **How It Works**:

- Deployments can be made using **ETH** or your own project’s **token** (on networks like **Ethereum**, **Arbitrum**, or **Polygon**).
- Staking or paying with tokens grants access to premium services, including faster processing and additional features.
- Fees are paid directly to smart contracts, ensuring transparency and security.
- Need a fully functional Layer 1 blockchain? You can easily set up your own **Proof of Stake (PoS) Devnet** using Docker by following this [guide](https://rauljordan.com/how-to-setup-a-proof-of-stake-devnet/), enabling you to run your own blockchain network for VM deployments.


---

## 📈 Credibility Mechanisms

We believe in *trust through transparency*. By integrating blockchain technology, we ensure that every VM deployment and resource usage is publicly verifiable on-chain.

- **Smart Contracts**: Every transaction, from deployment to staking, is managed through transparent smart contracts on **Ethereum** or **Arbitrum**.
- **Decentralization**: A decentralized VM network ensures that no single entity controls the deployment process — ensuring fairness and reliability.
- **NFT Certificates**: Each successful deployment creates a verifiable **NFT** certificate, showing that the deployment was made in a secure and trustworthy manner.

---

## 🔗 Technologies Used

- **Blockchain Integration**: Ethereum, Arbitrum, Polygon (ERC-20 tokens, DeFi, and NFTs)
- **Cloud Platforms**: AWS, Azure, Google Cloud
- **Virtualization**: Docker, VMware, VirtualBox
- **Automation**: Docker compose, Bash Scripts, Yarn
- **Smart Contracts**: Solidity, Hardhat

---

## 📦 Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Install Node.js from the [official website](https://nodejs.org).
- **Yarn**: Install Yarn using npm:
    ```bash
    npm install -g yarn
    ```
- **Docker**: Install Docker from the [official website](https://www.docker.com/get-started).
- **Hardhat**: Install Hardhat using npm:
    ```bash
    npm install -g hardhat
    ```


## 🚀 Getting Started

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/netzulo/evm-deployer-boilerplateue.git
    ```

2. **Install Dependencies**:
    Navigate into the project directory and install the necessary dependencies.
    ```bash
    cd evm-deployer-boilerplateue
    yarn install
    ```

3. **Configure Your Environment**:
    Set up your cloud API keys and blockchain wallet addresses in the `.env` file for smooth integration with Ethereum or Arbitrum.

4. **Deploy to a EVM Chain**:
    Run the deployment script to initiate the VM setup process.
    ```bash
    yarn deploy
    ```

---

## 🛠️ Contributing

We welcome contributions! If you want to improve the boilerplate, fix bugs, or add new features, feel free to fork the repository and submit a pull request.

### How to Contribute:
- Fork the repository.
- Create a new branch (`git checkout -b feature-branch`).
- Make your changes and commit them.
- Execute ```yarn ci``` to ensure your code is properly formatted.
- Push to your branch (`git push origin feature-branch`).
- Open a pull request.

### Scripts:

Script "yarn ci" will run the following commands in strict order:

---

## 📝 Scripts

The following table describes the available scripts in the `package.json` file and how to use them to manage your project:

| Script                | Description                                                                                         |
|-----------------------|-----------------------------------------------------------------------------------------------------|
| `clean:rm`            | Removes generated files such as `node_modules`, artifacts, and dependency lock files.               |
| `clean:hardhat`       | Cleans up artifacts generated by Hardhat.                                                           |
| `clean`               | Runs `clean:rm` to fully clean the project.                                                         |
| `configure`           | Copies the `.env.example` file to `.env` to set up the environment configuration.                   |
| `lint`                | Runs Hardhat's static checks to ensure the code is properly formatted and error-free.               |
| `dev`                 | Runs `lint` and starts Hardhat's compilation watcher for continuous development.                    |
| `build`               | Compiles the project using Hardhat.                                                                 |
| `test:sizer`          | Measures the size of deployed contracts using Hardhat.                                              |
| `test`                | Runs the test suite with code coverage enabled.                                                     |
| `ci`                  | Cleans the project, installs dependencies, checks the code, and compiles it for CI pipelines.       |
| `ci:deploy`           | Runs `ci` and then deploys the smart contracts to the configured networks.                          |
| `ci:verify`           | Runs `ci` and then verifies the deployed smart contracts on the respective blockchains.             |
| `chain:stress`        | Runs a stress test script on the local Hardhat network.                                             |
| `deploy`              | Deploys the smart contracts to the configured network.                                              |
| `deploy:<network>`    | Deploys the smart contracts to the specified network (e.g., `ethereum`, `polygon`, `optimism`, etc.).|
| `chain:devnet`        | Starts a local Hardhat development network.                                                         |
| `verify`              | Verifies deployed contracts on the configured network.                                              |
| `verify:<network>`    | Verifies deployed contracts on the specified network (e.g., `ethereum`, `polygon`, `arbitrum`, etc.).|

Replace `<network>` with the appropriate blockchain network, such as `ethereum`, `polygon`, `bsc`, `arbitrum`, `optimism`, `coinbase`, or others supported in the project.

## 🐋 Docker

Docker is a key component of this boilerplate, enabling you to create isolated environments for your EVM deployments. By using Docker, you can ensure consistency across different development and production environments.

###  With Docker CLI

1. **Build Docker Image**:
    Navigate to the project directory and build the Docker image.
    ```bash
    docker build -t evm-deployer .
    ```

2. **Run Docker Container**:
    Start a Docker container using the built image.
    ```bash
    docker run -it --rm --name evm-deployer-container evm-deployer
    ```

### With Docker Compose

For more complex setups, you can use Docker Compose to manage multi-container Docker applications.

1. **Start Services**:
    Use Docker Compose to start all required services.
    ```bash
    docker-compose -f docker-compose.yml up -d
    ```

2. **Stop Services**:
    Stop the services when you are done.
    ```bash
    docker-compose -f docker-compose.yml down --rmi all
    ```

By leveraging Docker, you can streamline your development workflow and ensure that your EVM deployments are consistent and reproducible across different environments.

---

## 🪙 Supported Blockchains

This boilerplate supports deployment on the following blockchain networks:

- **Ethereum** (Mainnet)
- **Goerli** (Ethereum Testnet)
- **Polygon** (Mainnet)
- **Mumbai** (Polygon Testnet)
- **Binance Smart Chain (BSC)** (Mainnet)
- **BSC Testnet**
- **Arbitrum** (Mainnet)
- **Arbitrum Goerli** (Testnet)
- **Optimism** (Mainnet)
- **Optimism Goerli** (Testnet)
- **Coinbase** (Layer 2 solution by Coinbase)
- **Devnet** (Local development network)
- **Docker** (Local development via Docker)
- **Hardhat** (Local testing environment)

---

## 🔗 References

- [Ethereum](https://ethereum.org)
- [Arbitrum](https://arbitrum.io)
- [Polygon](https://polygon.technology)
- [DeFi Protocols on Ethereum](https://www.coindesk.com/defi)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌍 Connect With Us

Join our community and stay updated on new features:

- [Twitter](https://twitter.com/El_Wose)
- [GitHub](https://github.com/netzulo/evm-deployer-boilerplateue)

## 💸 Donate

If you find this project useful and would like to support its development, you can make a donation using **ETH** or **ARB** through **Arbitrum One** or **Polygon**.

🪙 **Ethereum / Arbitrum Address**: `0xe3744590376c22B9D010d3CAfee796d5EbDBA9A8`

To donate, simply send **ETH** or **ARB** from the **Polygon** network to the above address.

You can send donations directly to the address using your preferred wallet or by clicking the button below:

[![Donate with Ethereum or ARB](https://img.shields.io/badge/Donate%20with-Ethereum%20or%20ARB-6A4CFF?style=flat&logo=ethereum)](https://www.ethereum.org)

Thank you for your support! 🙌