---
description: "Use when editing Solidity contracts, Hardhat scripts, tests, Docker workflow, or local deployment configuration in this repository."
applyTo: "contracts/**/*.sol,tests/**/*.js,scripts/**/*.js,hardhat.config.js,docker-compose.yml,Dockerfile,README.md,docs/**/*.md"
---

## Repository conventions

- Keep contract APIs stable unless the task explicitly changes behavior.
- Favor smoke-tested deployment flows over theoretical improvements.
- Do not introduce additional frameworks when Hardhat plus plain Node.js is sufficient.
- Use `tests/integration/` only for scenarios that require an external RPC such as Docker or a local devnet.
- If you touch local RPC configuration, preserve support for both `devnet` and `docker` networks.

## Testing expectations

- Fix broken tests at the root cause before adding new ones.
- Integration tests must be skippable on the in-process `hardhat` network.
- Prefer tests that validate deployment, role assignment, and at least one state-changing contract action.

## Documentation expectations

- Any workflow added for humans should be mirrored in `docs/`.
- AI-related docs should stay concrete: commands, files, assumptions, and failure modes.