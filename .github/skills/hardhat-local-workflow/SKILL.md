---
name: hardhat-local-workflow
description: "Use when adding or debugging local Hardhat workflows, Docker-backed integration tests, deploy scripts, RPC configuration, or developer commands for this EVM repository."
---

# Hardhat Local Workflow

## Goal

Keep local development, local deployment, and Docker-backed integration testing aligned.

## Use when

- A task changes `hardhat.config.js`.
- A task needs a reliable local RPC URL.
- A task adds or fixes deployment automation.
- A task introduces or repairs integration tests.
- A task updates Docker commands or Compose behavior.

## Working rules

1. Confirm whether the change targets the in-process `hardhat` network or an external RPC such as `docker` or `devnet`.
2. Use `127.0.0.1` defaults for local URLs unless the task explicitly requires container-to-container addressing.
3. If integration tests depend on Docker, make the startup flow deterministic by waiting for the JSON-RPC endpoint before running tests.
4. Keep unit tests independent from Docker.
5. If you add a new script, document it in `docs/testing.md` and make sure the command is visible in `package.json`.

## Validation checklist

- `yarn build`
- `yarn test:unit`
- `yarn test:integration:docker`
- If deployment scripts changed, `yarn deploy:docker` after the node is up