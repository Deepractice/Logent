# Logent

> **AI-First logging library for intelligent agents**  
> Log like you think. Universal, observable, and designed for the age of AI.

[![npm version](https://img.shields.io/npm/v/logent.svg)](https://www.npmjs.com/package/logent)
[![License](https://img.shields.io/npm/l/logent.svg)](https://github.com/Deepractice/Logent/blob/main/LICENSE)

## Why Logent?

Traditional logging was built for traditional applications. But AI agents think differently - they reason, decide, reflect, and act across multiple contexts. **Logent** is the first logging library designed from the ground up for the age of intelligent agents.

### The Problem

AI agents need more than `console.log`:
- **Context switching** - Agents work across Node.js, edge runtimes, browsers, and tests
- **Thought visibility** - Need to trace reasoning chains, not just events
- **Test-friendly** - Logging shouldn't pollute test output
- **Structured insights** - LLMs need parseable, semantically rich logs

### The Solution

Logent provides:
- ✨ **Universal** - One logger, all runtimes (Node.js, Cloudflare Workers, Browser, Test)
- 🧠 **AI-First** - Designed for agent observability
- 🎯 **Zero config** - Auto-detects environment, sensible defaults
- 📊 **Test-native** - Silent by default in tests, inspectable logs
- 🚀 **Tree-shakeable** - Only bundle what you use

## Quick Start

\`\`\`bash
npm install logent
# or
pnpm add logent
\`\`\`

### Basic Usage

\`\`\`typescript
import { createLogger } from 'logent';

const logger = createLogger();

logger.info('Agent started');
logger.warn('Low confidence in result');
logger.error('Tool call failed', { tool: 'search', reason: 'timeout' });
\`\`\`

See the [Core Package README](./packages/logent/README.md) for complete documentation.

## Monorepo Structure

\`\`\`
logent/
├── packages/
│   └── logent/           # Core library
├── apps/                 # Example applications (coming soon)
├── docs/                 # Documentation
└── operations/           # Internal tooling
\`\`\`

## Philosophy

Logent is built on three principles:

1. **Universal** - Write once, run anywhere
2. **AI-First** - Designed for intelligent agents
3. **Simple** - Zero config, sensible defaults

Inspired by the [Monogent](https://github.com/Deepractice/PromptX/docs/monogent.md) cognitive framework and built for the age of AI agents.

## License

MIT © [Deepractice](https://deepractice.ai)

## Related Projects

- [PromptX](https://github.com/Deepractice/PromptX) - AI Agent development platform
- [Monogent](https://github.com/Deepractice/PromptX/docs/monogent.md) - AI cognitive framework

---

**Logent** - Logging for the age of agents.
