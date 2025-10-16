# Repository Guidelines

Keep contributions small, typed, and verifiable so the Gemini automation stays reliable and predictable.

## Project Structure & Module Organization
- Ship all Next.js code under `src/` (routes, components, hooks); reusable helpers belong in `src/lib/`.
- Share runtime contracts from `schemas/`; automation entry points live in `Makefile`, `.trunk/`, `.github/workflows/`, and `scripts/`.
- Generated plans and bundles are stored in `artifacts/`, `prompts/`, and `plans/`; long-lived fixtures and mocks stay in `tests/`.
- Static assets and references live in `public/`, `docs/`, and `logs/`; keep legacy screens archived in `october/`.

## Build, Test, and Development Commands
- `npm install` — install or refresh dependencies.
- `npm run gem:research` / `npm run gem:flash` / `npm run gem:pro` — regenerate Gemini research, rebuild the UI shell, and harden integrations.
- `npm run orchestrate` or `make all` — execute the full A→B→C pipeline with automation checkpoints.
- `trunk check` — run Prettier, ESLint, and Markdown/JSON linting before proposing a PR.
- `npm test` or `NODE_OPTIONS=--test npm test` — run the primary Jest suite or a fast smoke pass.

## Coding Style & Naming Conventions
- Default to TypeScript ES modules with two-space indentation; rely on Prettier via `trunk check`.
- Use PascalCase for React components and classes, camelCase for helpers, and kebab-case for generated bundles (e.g., `artifacts/research_bundle.json`).
- Start interactive `.tsx` files with `'use client';` order Tailwind classes layout → spacing → color; keep comments brief and focused on non-obvious logic.

## Testing Guidelines
- Maintain baseline coverage with Jest via `npm test`; add `node --test` or Vitest specs in `scripts/__tests__/` when exercising Gemini mocks.
- Co-locate stable component tests with their sources, and place integration fixtures or large scenarios in `tests/`.
- Capture logs for failing runs and attach them to issues or PRs when requesting review.

## Commit & Pull Request Guidelines
- Write short, imperative commit subjects (e.g., `Add orchestrator Makefile`) and separate regenerated artifacts from manual edits.
- Draft PR descriptions that link planning tickets, summarize scope, and paste `npm run orchestrate` or `trunk check` output; include UI screenshots for visible changes.
- Highlight follow-up work so downstream automation can stay aligned with remaining tasks.

## Security & Configuration Tips
- Never commit secrets; load `GEMINI_API_KEY` and similar keys from `.env.local` or CI secrets only.
- Follow concurrency guidance documented in `README.md`, and record any intentional deviations inside the applicable plan markdown.
- Review generated manuals before promoting them to `artifacts/` to avoid leaking sensitive routing or streaming details.
