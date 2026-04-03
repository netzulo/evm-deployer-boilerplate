# Local Development

## Initial setup

```bash
yarn install
yarn build
```

If `.env` does not exist, Hardhat creates one with:

- `PRIVATE_KEY`
- `DEVNET_RPC_URL`
- `DOCKER_RPC_URL`

## Useful commands

```bash
yarn build
yarn lint
yarn test:unit
yarn test:integration:devnet
yarn test:integration:docker
yarn chain:devnet
yarn deploy
yarn deploy:devnet
yarn deploy:docker
yarn verify:devnet
yarn verify:docker
```

## Local deployment targets

- `deploy` uses the in-process `hardhat` network.
- `deploy:devnet` expects a node on `127.0.0.1:8545` unless overridden.
- `deploy:docker` expects a node on `127.0.0.1:9545` unless overridden.

## Docker node

```bash
docker compose up -d --build
docker compose down --remove-orphans
```

The Compose service exposes the node on local port `9545`.

## Devnet integration runner

`yarn test:integration:devnet` starts a local Hardhat node on `127.0.0.1:8545`, waits for the RPC, runs the external-network integration suite, and stops the node afterward.