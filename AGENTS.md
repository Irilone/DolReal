# Repository Guidelines

## Project Structure & Module Organization
Keep orchestration assets at the repository root: `.trunk/` for linting, `.github/workflows/` for CI, `Makefile` for chained runs, and `scripts/` for Gemini helpers. Next.js source lives in `src/` with components, hooks, and app routes; static assets belong in `public/`. Generated artifacts such as `research_bundle.json` must land in `artifacts/`, never in `october/`. Preserve the `october/` prototypes (`dol.tsx`, `alt-dol.tsx`, `dol-2.tsx`) until the new app fully replaces them. Store shared schema definitions under `schemas/` and long-form manuals inside `perplexity_manuals/`.

## Build, Test, and Development Commands
- `npm install`: install workspace dependencies.
- `npm run gem:research`: call Gemini 2.5 Pro Ultra to create the research bundle and plan docs.
- `npm run gem:flash`: scaffold or refresh the Next.js shell from the current prompts.
- `npm run gem:pro`: integrate generated assets and apply hardening passes.
- `npm run orchestrate` / `make all`: execute the full A→B→C pipeline.
- `trunk check`: run Prettier, ESLint, and Markdown/JSON linters.
- `npm test`: execute configured Node or React suites; add `NODE_OPTIONS=--test` for ad-hoc smoke runs.

## Coding Style & Naming Conventions
Default to TypeScript ES modules with two-space indentation and Prettier formatting (enforced via Trunk). Name React components and classes in PascalCase, helpers in camelCase, and generated bundles or prompts in kebab-case (e.g., `research_bundle.json`, `site_spec.md`). Place `'use client';` at the top of interactive `.tsx` files and group Tailwind classes by layout → spacing → color for clarity.

## Testing Guidelines
Favor `node --test` or Vitest specs under `scripts/__tests__/` to mock Gemini calls, assert payloads, and verify file writes. Co-locate React Testing Library specs with their components once the Next.js UI stabilizes (player state, modal focus, day-two deactivation). Run `trunk check` and `npm test` before submitting any PR, attaching logs for failing cases.

## Commit & Pull Request Guidelines
Write short, imperative commit titles (e.g., `Add orchestrator Makefile`). Describe regenerated artifacts separately from source edits and note which prompts or bundles changed. Pull requests should link planning tickets, paste key command output (`npm run orchestrate`, `trunk check`), and include screenshots for UI adjustments. Call out follow-up tasks so the execution pipeline stays traceable.

## Security & Configuration Tips
Never commit secrets; source `GEMINI_API_KEY` from `.env.local` or CI secrets. Keep concurrency and rate limits aligned with the README policy, documenting exceptions in the relevant plan markdown. Review generated manuals for sensitive routing or streaming details before publishing to `artifacts/`.
