---
description: "Add or extend Docker-backed integration coverage for contract deployment, role setup, or local RPC behavior in this Hardhat repository."
mode: ask
---

Review the repository workflow for local integration testing and improve it without breaking the current unit-test flow.

Focus on:

1. What behavior is only validated on the in-process Hardhat network today.
2. What should also be validated against the `docker` or `devnet` RPC.
3. Which scripts, tests, docs, and config values must change together.
4. The exact validation commands to run after the change.

Return a concise implementation plan first, then apply the changes.