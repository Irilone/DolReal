# Repository Guidelines

## Project Structure & Module Organization
- Next.js app code lives in `src/` (routes, components, hooks); shared Zod schemas stay in `schemas/`.
- Orchestration and automation entry points: `Makefile`, `.trunk/`, `.github/workflows/`, and `scripts/`.
- Generated research and plans land in `artifacts/`, `prompts/`, and `plans/`; integration fixtures sit in `tests/`.
- Keep static assets in `public/`, reference docs in `docs/`, and automation logs in `logs/`. Preserve prototype screens in `october/`.

## Build, Test, and Development Commands
- `npm install` — install workspace dependencies.
- `npm run gem:research` / `npm run gem:flash` / `npm run gem:pro` — regenerate Gemini research, rebuild the UI shell, and harden integrations.
- `npm run orchestrate` or `make all` — execute the full A→B→C pipeline.
- `trunk check` — run Prettier, ESLint, and Markdown/JSON linting.
- `npm test` or `NODE_OPTIONS=--test npm test` — run the React/Node suite or a faster smoke pass.

## Coding Style & Naming Conventions
- Default to TypeScript ES modules with two-space indentation; rely on Prettier via `trunk check`.
- React components and classes use PascalCase; helpers use camelCase; generated bundles use kebab-case (e.g., `artifacts/research_bundle.json`).
- Begin interactive `.tsx` files with `'use client';` and order Tailwind classes layout → spacing → color.
- Centralize reusable logic under `src/lib/`; keep comments brief and focused on non-obvious behavior.

## Testing Guidelines
- Primary coverage comes from Jest via `npm test`; supplement with `node --test` or Vitest specs under `scripts/__tests__/` for Gemini mocks.
- Co-locate stabilized component tests with their sources; leave integration fixtures in `tests/`.
- Capture logs for any failing runs before submitting PRs.

## Commit & Pull Request Guidelines
- Write short, imperative commit titles (e.g., `Add orchestrator Makefile`) and separate regenerated artifacts from manual edits.
- PRs should link planning tickets, summarize intent, attach `npm run orchestrate` or `trunk check` output, and include UI screenshots when relevant.
- Call out follow-up work so automation stays aligned with open tasks.

## Security & Configuration Tips
- Never commit secrets; load `GEMINI_API_KEY` and similar values from `.env.local` or CI secrets.
- Respect concurrency guidance in the README and document any exceptions inside plan markdowns.
- Review generated manuals for sensitive routing or streaming details before promoting them into `artifacts/`.
