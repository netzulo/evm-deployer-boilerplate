# Testing

## Test types

### Unit tests

Unit tests run on Hardhat's in-process network and should stay fast and isolated.

```bash
yarn test:unit
```

### Coverage

Coverage still runs through Hardhat and skips Docker-specific integration suites.

```bash
yarn test
```

### Docker-backed integration tests

Integration tests validate that contracts can be deployed, verified in local dry-run mode, and exercised against external RPCs.

### Devnet-backed integration tests

```bash
yarn test:integration:devnet
```

That command:

1. Compiles the repository.
2. Starts a local Hardhat node on `127.0.0.1:8545`.
3. Waits until the JSON-RPC endpoint is responsive.
4. Runs `tests/integration/*.test.js` against the `devnet` network.
5. Stops the local node unless `--keep-alive` is passed to `scripts/runIntegration.js`.

```bash
yarn test:integration:docker
```

That command:

1. Compiles the repository.
2. Starts `docker compose` with a local node.
3. Waits until the JSON-RPC endpoint is responsive.
4. Runs `tests/integration/*.test.js` against the `docker` network.
5. Shuts the containers down unless `--keep-alive` is passed to `scripts/runIntegration.js`.

## Script coverage in integration tests

The external-network suite covers:

- direct contract deployment and state changes over the external RPC,
- `scripts/deploy.js`,
- `scripts/verifier.js` in local dry-run mode.

## Failure modes

- If Docker is unavailable, the integration runner fails before test execution.
- If port `9545` is already in use, the Compose service cannot bind locally.
- If port `8545` is already in use, the devnet runner cannot start the local node.
- If the local `.env` and the image diverge, rebuild with `docker compose up -d --build`.