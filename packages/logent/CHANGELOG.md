# @deepracticex/logger

## 1.1.1

### Patch Changes

- b0adef0: Setup CI/CD pipeline with GitHub Actions and configure automated release workflow

## 0.2.0

### Minor Changes

- ba85ad1: # Test Framework Stabilization

  Major iteration to stabilize the test framework and resolve all test failures.

  ## Fixed Issues
  - **Configuration File Lifecycle**: Resolved step definition conflicts where "I am in the monorepo root" was overwriting configuration files created by "the monorepo has been initialized"
  - **Step Definition Duplication**: Fixed duplicate "the monorepo is initialized" steps in workspace.steps.ts and validation.steps.ts that had different behavior
  - **Package Generator**: Added `types: []` override in generated tsconfig.json to avoid vitest/globals dependency requirement
  - **Output Format Consistency**: Standardized output labels (Packages/Apps/Services capitalization, "pnpm workspace" naming)
  - **Validation Testing**: Corrected error output expectations (stdout vs stderr) for validation failure scenarios

  ## Test Results
  - Reduced from **22 failures** to **0 failures**
  - All 123 scenarios now passing (932 steps total)
  - Test execution time: ~25 seconds

  ## Impact

  This stabilizes the testing infrastructure and ensures reliable CI/CD pipelines going forward. The fixes primarily affect test step definitions and output formatting, with minimal changes to core functionality.

## 0.1.0

### Minor Changes

- 2249ddb: Initial release of logger package
  - Pino-based high-performance logging
  - Automatic caller location tracking (package, file, line number)
  - Daily log rotation with separate error logs
  - MCP stdio mode compatibility (auto-disables colors)
  - Electron compatibility (sync mode for worker thread issues)
  - Flexible API supporting multiple call patterns
  - Custom logger instances with package names
  - Full TypeScript support
