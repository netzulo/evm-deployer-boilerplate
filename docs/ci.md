# CI

## Purpose

The GitHub Actions workflow validates the repository using the same commands developers are expected to run locally.

## Stages

- `lint`: runs `yarn lint`.
- `build`: runs `yarn build`.
- `unit-tests`: runs `yarn test:unit`.
- `integration-devnet`: runs `yarn test:integration:devnet`.
- `integration-docker`: runs `yarn test:integration:docker`.

## Why these stages

- `yarn ci` is intentionally not used in GitHub Actions because it reinstalls dependencies and re-runs overlapping steps in a single script, which makes failures less readable.
- Coverage is not part of the default CI path because it is slower and overlaps with unit validation.
- Both external-network stages are kept because the repository supports two local execution models: a local Hardhat node and a Docker-exposed node.

## Trigger policy

The workflow runs on pushes and pull requests targeting `main`.