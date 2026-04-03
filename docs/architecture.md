# Architecture

## Current stack

- Solidity contracts compiled with Hardhat.
- Artifacts and cache stored under `.data/`.
- Local execution supported through the in-process `hardhat` network, `devnet` on port `8545`, and `docker` on port `9545`.

## Contracts in the repository

- `contracts/permissions/MAC.sol`: managed access control with an agent model built on `AccessControl`.
- `contracts/tokens/UserCreditToken.sol`: ERC-20 token that inherits `MAC` and grants mint and pause capabilities to agents.
- `contracts/eips/*.sol`: example ERC implementations for experimentation.

## Runtime model

1. `hardhat.config.js` loads or generates a private key in `.env`.
2. Compilation writes artifacts to `.data/artifacts`.
3. `scripts/deploy.js` deploys the core contracts and writes `.data/deployed.json` plus a network-specific deployment record.
4. `scripts/verifier.js` reads the deployment record and performs explorer verification on public networks or local dry-run validation on `hardhat`, `devnet`, and `docker`.

## Local network expectations

- `devnet` defaults to `http://127.0.0.1:8545`.
- `docker` defaults to `http://127.0.0.1:9545`.
- Both URLs can be overridden with `DEVNET_RPC_URL` and `DOCKER_RPC_URL`.