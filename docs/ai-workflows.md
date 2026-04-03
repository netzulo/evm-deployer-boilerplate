# AI Workflows

## Purpose

The `.github` directory contains repository-specific AI customizations so future work on Solidity, Hardhat, Docker, and docs stays consistent.

## Included customizations

- `copilot-instructions.md`: always-on repository guidance.
- `instructions/solidity.instructions.md`: file-scoped instructions for contracts, tests, scripts, Docker, and docs.
- `agents/solidity-maintainer.agent.md`: specialized agent profile for maintaining the repository.
- `skills/hardhat-local-workflow/SKILL.md`: workflow guidance for local RPC, deploy, and integration testing tasks.
- `skills/readme-alignment/SKILL.md`: guidance for reconciling README claims with code.
- `prompts/add-integration-coverage.prompt.md`: prompt for expanding integration coverage.
- `prompts/align-readme-with-code.prompt.md`: prompt for README-to-code alignment work.

## Expected usage

- Use the local-workflow skill when touching `hardhat.config.js`, Docker, deploy scripts, or integration tests.
- Use the README-alignment skill when turning roadmap-style README text into verified implementation work.
- Keep docs updates in the same change as workflow updates.