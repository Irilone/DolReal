# Repository Guidelines

## Project Structure & Module Organization

Root orchestration lives in `Makefile`, `.trunk/`, `.github/workflows/`, and `scripts/`. Core Next.js code sits in `src/` (app routes, components, hooks) with shared schemas in `schemas/`. Store generated research in `artifacts/` (e.g., `research_bundle.json`), never `october/`; keep static assets in `public/` and manuals in `perplexity_manuals/`. Prompts and plans belong in `prompts/` and `plans/`, while integration fixtures live in `tests/`. Retain prototype screens in `october/dol.tsx`, `october/alt-dol.tsx`, and `october/dol-2.tsx` until the production flow replaces them. Use `docs/` for references and `logs/` for automation output.

## Build, Test, and Development Commands

- `npm install`: install workspace dependencies.
- `npm run gem:research`: refresh Gemini research bundles and planning docs.
- `npm run gem:flash`: regenerate the Next.js shell from prompts.
- `npm run gem:pro`: integrate Gemini outputs and run hardening passes.
- `npm run orchestrate` / `make all`: execute the full A→B→C pipeline.
- `trunk check`: apply Prettier, ESLint, and Markdown/JSON linting.
- `npm test`: run Node and React suites; add `NODE_OPTIONS=--test` for quick smoke runs.

## Coding Style & Naming Conventions

Default to TypeScript ES modules with two-space indentation and rely on Prettier via `trunk check`. Name React components and classes in PascalCase, helpers in camelCase, and generated bundles in kebab-case (`research_bundle.json`, `site_spec.md`). Start interactive `.tsx` files with `'use client';` and order Tailwind classes layout → spacing → color. Centralize shared utilities in `src/lib/` and keep comments focused on non-obvious behavior.

## Testing Guidelines

Jest drives primary suites through `npm test`; augment with `node --test` or Vitest specs under `scripts/__tests__/` to mock Gemini calls and verify file writes. Place component tests beside their sources once stabilized and keep integration fixtures in `tests/`. Always run `trunk check` and `npm test` before opening a PR, capturing logs for any failures.

## Commit & Pull Request Guidelines

Use short, imperative commit titles (`Add orchestrator Makefile`). Separate regenerated artifacts from manual changes and call out updated prompts or bundles. PRs should link planning tickets, summarize intent, attach output from `npm run orchestrate` or `trunk check`, and include screenshots for UI changes. Note any follow-up work so automation stays aligned.

## Security & Configuration Tips

Never commit secrets; source `GEMINI_API_KEY` from `.env.local` or CI secrets. Keep concurrency aligned with README guidance and document exceptions in plan markdowns. Review generated manuals for sensitive routing or streaming details before copying to `artifacts/`.
