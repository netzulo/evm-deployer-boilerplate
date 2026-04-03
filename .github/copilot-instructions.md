# AI Collaboration Rules

This repository is a Hardhat-based Solidity project for deploying and testing contracts on local and public EVM networks.

## Core expectations

- Prefer minimal, verifiable changes over speculative refactors.
- Treat `contracts/`, `scripts/`, `tests/`, `docker-compose.yml`, `Dockerfile`, `hardhat.config.js`, and `docs/` as the main sources of truth.
- Keep Solidity changes compatible with the current compiler target unless the task explicitly requires a version bump.
- When changing deployment behavior, update both the relevant script and the operational docs in `docs/`.
- When changing tests, preserve the split between unit tests and Docker-backed integration tests.

## Local workflow expectations

- `yarn build` must keep working.
- Unit tests run with `yarn test:unit`.
- Docker-backed integration tests run with `yarn test:integration:docker`.
- Local RPC endpoints should default to `127.0.0.1` and remain overridable by environment variables.

## Documentation expectations

- Keep `README.md` high level.
- Put operational details, architecture notes, and AI-facing knowledge in `docs/`.
- If the README makes claims that are no longer true, either implement the missing behavior or narrow the wording.