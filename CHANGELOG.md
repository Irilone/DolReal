# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive bilingual README.md (English and Swedish)
- Detailed CONTRIBUTING.md with development guidelines
- GitHub issue templates (bug report, feature request, documentation)
- GitHub pull request template
- SECURITY.md with vulnerability reporting guidelines
- CHANGELOG.md for version tracking
- .gitkeep files for important empty directories
- Enhanced .gitignore with better coverage

### Changed
- Improved .gitignore to exclude build artifacts and backup files
- Updated repository structure documentation

### Removed
- Removed .DS_Store file from repository
- Removed tsconfig.tsbuildinfo from repository
- Excluded alt-root-claude directory from Git tracking

### Fixed
- Fixed repository cleanliness issues

## [2.0.0] - 2025-10-16

### Added
- Next.js 15 App Router implementation
- Multi-agent orchestration system (4-stage pipeline)
- TypeScript strict mode support
- Internationalization support (6 languages: se, en, ar, fa, zh, es)
- RTL support for Arabic and Farsi
- Dark mode support
- YouTube Live API integration
- InfraNodus knowledge graph integration
- Zustand state management
- Jest and React Testing Library setup
- ESLint and Prettier configuration via Trunk
- Tailwind CSS v3 styling
- Comprehensive Makefile for orchestration
- AI agent scripts (Gemini, OpenAI, Anthropic)
- Environment configuration system
- Project documentation (AGENTS.md, CLAUDE.md, GEMINI.md)

### Features
- 4 simultaneous live stream support
- Day-two transition logic (Nodväst only)
- Responsive design
- WCAG 2.2 AA accessibility compliance
- Performance optimizations (LCP <2.5s, CLS <0.1)
- Bundle size optimization (<250KB target)

### Technical Stack
- Next.js 15.0.0
- React 18.3
- TypeScript 5.3
- Tailwind CSS 3.4
- Bun/npm package managers
- Vite build tool
- Jest testing framework

## [1.0.0] - Previous Version

Initial release with basic streaming functionality.

---

## Release Types

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version (X.0.0) - Incompatible API changes
- **MINOR** version (0.X.0) - New functionality (backwards-compatible)
- **PATCH** version (0.0.X) - Bug fixes (backwards-compatible)

## Change Categories

Changes are grouped by:

- **Added** - New features
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security vulnerability fixes

## Links

- [Latest Release](https://github.com/Irilone/DolReal/releases/latest)
- [All Releases](https://github.com/Irilone/DolReal/releases)
- [Compare Versions](https://github.com/Irilone/DolReal/compare)

[Unreleased]: https://github.com/Irilone/DolReal/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/Irilone/DolReal/releases/tag/v2.0.0
[1.0.0]: https://github.com/Irilone/DolReal/releases/tag/v1.0.0
