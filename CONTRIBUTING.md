# Contributing to DolReal

Thank you for your interest in contributing to DolReal! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:

- Be respectful and constructive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/DolReal.git
cd DolReal
```

### 2. Set Up Development Environment

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your API keys
nano .env

# Verify setup
make check-env
```

### 3. Create a Branch

```bash
# Create a new branch for your feature or fix
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

## Development Workflow

### 1. Make Changes

- Keep changes focused and atomic
- Follow the existing code style
- Add tests for new functionality
- Update documentation as needed

### 2. Test Your Changes

```bash
# Run type checking
npm run typecheck

# Run linter
npm run lint

# Run tests
npm test

# Run all checks
trunk check
```

### 3. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new feature description"
```

### 4. Push and Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# Then create a Pull Request on GitHub
```

## Coding Standards

### TypeScript

- Use strict mode
- Provide explicit type annotations
- Avoid `any` type unless absolutely necessary
- Use interfaces for object shapes
- Use type aliases for unions and complex types

**Example:**
```typescript
// Good
interface StreamCardProps {
  title: string;
  isLive: boolean;
  viewerCount?: number;
}

// Avoid
function handleClick(data: any) {
  // ...
}
```

### React Components

- Use functional components with hooks
- Name components using PascalCase
- Export components as default when appropriate
- Keep components focused and single-purpose

**Example:**
```typescript
// Good
export default function StreamCard({ title, isLive }: StreamCardProps) {
  // ...
}

// Avoid
export default function streamcard(props: any) {
  // ...
}
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `StreamCard.tsx`)
- Utilities: `kebab-case.ts` (e.g., `youtube-client.ts`)
- Tests: `*.test.tsx` or `*.spec.tsx`
- Types: `*.types.ts` or in `types/` directory

### Code Style

- **Indentation**: 2 spaces (enforced by Prettier)
- **Line Length**: 100 characters (soft limit)
- **Quotes**: Single quotes for strings, double quotes for JSX attributes
- **Semicolons**: Yes (enforced by Prettier)
- **Trailing Commas**: Yes (enforced by Prettier)

### Imports

Order imports as follows:

```typescript
// 1. React and Next.js
import React from 'react';
import { useRouter } from 'next/router';

// 2. External libraries
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

// 3. Internal imports - absolute paths
import { Button } from '@/components/ui/Button';
import { useStream } from '@/hooks/useStream';
import type { Stream } from '@/types';

// 4. Relative imports
import './styles.css';
```

### Comments

- Use JSDoc for functions and complex types
- Keep inline comments brief and meaningful
- Explain "why" not "what"

**Example:**
```typescript
/**
 * Fetches live stream data from YouTube API
 * @param videoId - YouTube video ID
 * @returns Stream data with viewer count and status
 */
async function fetchStreamData(videoId: string): Promise<StreamData> {
  // Use shorter timeout on day 2 to reduce API calls
  const timeout = isDay2 ? 5000 : 10000;
  // ...
}
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without changing functionality
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates
- **ci**: CI/CD changes

### Examples

```bash
# Feature
git commit -m "feat(streams): add multi-stream support"

# Bug fix
git commit -m "fix(i18n): correct Swedish translation for archive page"

# Documentation
git commit -m "docs: update README with Claude CLI instructions"

# Refactoring
git commit -m "refactor(components): simplify StreamCard component"

# With body and footer
git commit -m "feat(api): add YouTube Live API integration

Implements YouTube IFrame API for live stream playback.
Includes error handling and retry logic.

Closes #123"
```

### Commit Best Practices

1. **Keep commits atomic**: One logical change per commit
2. **Write descriptive messages**: Explain what and why, not how
3. **Reference issues**: Include issue numbers when applicable
4. **Test before committing**: Ensure code works and tests pass

## Pull Request Process

### Before Creating a PR

1. **Update your branch** with the latest changes from main:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all checks**:
   ```bash
   npm run typecheck
   npm run lint
   npm test
   trunk check
   ```

3. **Update documentation** if needed

### Creating the PR

1. **Use a descriptive title** following commit conventions:
   ```
   feat: add streaming schedule component
   fix: resolve memory leak in video player
   ```

2. **Fill out the PR template** completely:
   - Description of changes
   - Related issues
   - Type of change
   - Testing performed
   - Screenshots (for UI changes)

3. **Link related issues**:
   ```
   Fixes #123
   Closes #456
   Related to #789
   ```

### PR Review Process

1. **Automated checks** must pass:
   - TypeScript compilation
   - Linting
   - Tests
   - Build

2. **Code review** by maintainers:
   - Code quality
   - Architecture fit
   - Test coverage
   - Documentation

3. **Address feedback**:
   - Make requested changes
   - Push new commits
   - Respond to comments

4. **Approval and merge**:
   - At least one approval required
   - All checks must pass
   - Maintainer will merge

### PR Best Practices

- **Keep PRs small**: Easier to review and merge
- **One feature per PR**: Don't mix unrelated changes
- **Update documentation**: Keep docs in sync with code
- **Add screenshots**: For UI changes, include before/after
- **Be responsive**: Reply to feedback promptly
- **Be patient**: Reviews take time

## Testing Requirements

### Test Coverage

- Maintain minimum 80% code coverage
- Focus on critical paths:
  - API calls and error handling
  - State management
  - User interactions
  - Accessibility features

### Types of Tests

#### Unit Tests

Test individual functions and components:

```typescript
import { render, screen } from '@testing-library/react';
import StreamCard from '@/components/features/StreamCard';

describe('StreamCard', () => {
  it('renders stream title', () => {
    render(<StreamCard title="Nodväst" isLive={true} />);
    expect(screen.getByText('Nodväst')).toBeInTheDocument();
  });

  it('shows live indicator when streaming', () => {
    render(<StreamCard title="Test" isLive={true} />);
    expect(screen.getByText(/live/i)).toBeInTheDocument();
  });
});
```

#### Integration Tests

Test component interactions and workflows:

```typescript
describe('Stream Selection Flow', () => {
  it('allows selecting and viewing a stream', async () => {
    render(<StreamList />);
    
    const streamCard = screen.getByText('Nodväst');
    await userEvent.click(streamCard);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTitle(/video player/i)).toBeInTheDocument();
  });
});
```

#### Accessibility Tests

Ensure WCAG 2.2 AA compliance:

```typescript
import { axe } from 'jest-axe';

describe('Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<StreamCard title="Test" isLive={true} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', async () => {
    render(<StreamCard title="Test" isLive={true} />);
    const button = screen.getByRole('button');
    
    button.focus();
    expect(button).toHaveFocus();
    
    await userEvent.keyboard('{Enter}');
    // Assert expected behavior
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test StreamCard.test.tsx

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# View coverage report
open coverage/lcov-report/index.html
```

## Documentation

### What to Document

1. **Public APIs**: Functions, components, and hooks
2. **Complex logic**: Non-obvious implementations
3. **Configuration**: Setup and environment variables
4. **Architecture**: Design decisions and patterns
5. **Examples**: Usage examples for APIs

### Documentation Standards

#### JSDoc Comments

Use JSDoc for all public functions and components:

```typescript
/**
 * Fetches and returns live stream data from YouTube
 * 
 * @param videoId - The YouTube video ID
 * @param options - Optional configuration
 * @param options.timeout - Request timeout in milliseconds
 * @param options.retry - Whether to retry on failure
 * @returns Promise resolving to stream data
 * @throws {APIError} When API request fails
 * 
 * @example
 * ```typescript
 * const streamData = await fetchStreamData('abc123', {
 *   timeout: 5000,
 *   retry: true
 * });
 * ```
 */
async function fetchStreamData(
  videoId: string,
  options?: StreamOptions
): Promise<StreamData> {
  // ...
}
```

#### README Updates

Update README.md when:
- Adding new features
- Changing setup process
- Modifying build or test commands
- Adding new dependencies

#### Code Comments

```typescript
// Good: Explains why
// Use larger buffer on day 1 to handle 4 concurrent streams
const bufferSize = isDay1 ? 4096 : 1024;

// Avoid: Explains what (obvious from code)
// Set buffer size
const bufferSize = isDay1 ? 4096 : 1024;
```

### Bilingual Documentation

For user-facing documentation:
- Provide both English and Swedish versions
- Keep translations in sync
- Use clear, simple language

## Questions?

If you have questions about contributing:

1. **Check existing documentation**: README.md, docs/ directory
2. **Search issues**: Someone may have asked already
3. **Ask in discussions**: [GitHub Discussions](https://github.com/Irilone/DolReal/discussions)
4. **Open an issue**: For specific problems or proposals

## Thank You!

Your contributions make DolReal better. Thank you for taking the time to contribute!

---

**Happy Coding! 🚀**
