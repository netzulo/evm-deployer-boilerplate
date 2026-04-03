---
name: readme-alignment
description: "Use when the README, docs, scripts, or developer guidance need to be aligned with the real behavior of this Hardhat and Solidity repository."
---

# README Alignment

## Goal

Reduce the gap between repository marketing text and verified technical behavior.

## Procedure

1. Treat `package.json`, `hardhat.config.js`, `contracts/`, `scripts/`, `tests/`, and `docs/` as higher-confidence sources than `README.md`.
2. Mark each README claim as one of: implemented, partially implemented, or aspirational.
3. Prefer implementing small missing pieces when that creates a stable workflow.
4. If a claim is still aspirational after the change, move the operational detail into `docs/roadmap` style wording instead of leaving it implied as complete.

## Output expectations

- A short gap analysis.
- Minimal code and docs changes.
- A validation command list.