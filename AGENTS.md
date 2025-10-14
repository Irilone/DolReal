# Repository Guidelines

## Project Structure & Module Organization
The README defines a Gemini-driven delivery pipeline. Keep shared orchestration assets at the repo root: `.trunk/` for linting, `.github/workflows/` for automation, and (when added) `prompts/`, `artifacts/`, `scripts/`, and `Makefile` per the orchestration suite. The existing `october/` folder contains legacy UI prototypes (`dol.tsx`, `alt-dol.tsx`, `dol-2.tsx`) and placeholder integration directories—retain them until the new Next.js app fully replaces them. Any generated bundle such as `research_bundle.json` lives under `artifacts/`; never hand-place it in `october/`.

## Build, Test, and Development Commands
Bootstrap the Node workspace with `npm install` once a `package.json` matching the README scripts is present. Core commands: `npm run gem:research` (produces `research_bundle.json` and plan docs with Gemini 2.5 Pro Ultra), `npm run gem:flash` (scaffolds the Next.js skeleton), `npm run gem:pro` (integrates and hardens outputs), and `npm run orchestrate` or `make all` to chain the entire A→B→C flow. Before running, export `GEMINI_API_KEY` and ensure prompts reference the current bundle. Use `trunk check` for linting Markdown, JSON, and TypeScript, and inspect outputs in `artifacts/` before committing.

## Coding Style & Naming Conventions
TypeScript is the default for both CLI scripts (ES modules) and React code. Follow Prettier defaults (enforced via Trunk) with two-space indentation. Name components and modules in PascalCase, helper functions in camelCase, and keep bundles and prompts in kebab-case (`research_bundle.json`, `site_spec.md`). Mirror the README examples when declaring scripts (`scripts/gem.ts`) and make each prompt file self-identifying with version headers. For `.tsx` prototypes, keep `'use client';` guards and group Tailwind classes by layout → spacing → color for readability.

## Testing Guidelines
No automated suite exists yet; prioritize smoke coverage around the CLI. Add `node --test` or Vitest specs under `scripts/__tests__/` that mock the Gemini API and assert request payloads, file writes, and error handling. When the Next.js scaffolding lands, co-locate React Testing Library specs beside components to cover YouTube player state, modal focus traps, and day-two deactivation. Run `trunk check` and any new `npm test` job in CI before raising a PR.

## Commit & Pull Request Guidelines
Match the existing history with short, imperative subjects (`Add orchestrator Makefile`). Separate generated artifacts from source changes in the description, and note which prompts or bundles were regenerated. Never commit `GEMINI_API_KEY` or other secrets; use GitHub secrets for workflows. Pull requests should link planning tickets, include command outputs (`npm run orchestrate`, `trunk check`), attach screenshots for UI changes, and highlight follow-up work such as manual guide updates.

## Security & Configuration Tips
Store Gemini keys in `.env.local` or shell profiles ignored by Git, and reference them via CI secrets (`GEMINI_API_KEY`). Cap outbound concurrency as described in the README’s policy table and document any deviations inside the corresponding plan markdown. Treat generated manuals as reviewable artifacts—verify policy citations and redact sensitive router or streaming details before publishing.
