# EVM Deployer Boilerplate 🚀

Welcome to **EVM Deployer Boilerplate**! This repository provides a base framework to help you easily deploy EVM across various platforms, utilizing automation, modular configurations, and integration with blockchain ecosystems for an enhanced deployment experience.

---

## 🌟 Features

- **Modular & Customizable Setup**: Build your EVM deployments with ease and flexibility.
- **Automated Deployment Scripts**: Save time by deploying Smart contracts with a single command.
- **Cross-Platform Support**: Whether you're on AWS, Azure, Google Cloud, or self-hosted environments — this boilerplate works across platforms.
- **Blockchain Integration**: Seamlessly integrate with blockchain networks like **Ethereum**, **Arbitrum**, and **Polygon** to add decentralized features to your EVM deployments.
- **Credibility**: Leverage blockchain for transparency, creating trust in the deployment process.

---

## 💡 Economic Mechanics

The deployment process incorporates a *tokenized* system designed to enhance both the economic and credibility aspects:

- **Tokenized Deployment**: Use your native token for deploying Smart contracts, adding a layer of financial incentive and decentralization.
- **Staking**: Users can stake tokens to ensure priority access and faster deployment times.
- **Marketplace Integration**: Deploy Smart contracts as part of a marketplace where users can trade EVM instances or resources using **ERC-20** tokens.
- **Decentralized Finance (DeFi)**: Integrate VM deployment with DeFi protocols to create a decentralized infrastructure that is fully transparent and incentivized.

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


---

## 🪙 Supported Blockchains

This boilerplate supports deployment on several blockchain networks, allowing for decentralized and tokenized interactions:

- **Ethereum** (ETH)
- **Arbitrum** (Layer 2 scaling for Ethereum)
- **Polygon** (Layer 2 solution for Ethereum scalability)

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