# DolReal - Dagar om Lagar 2025

Multi-Agent Orchestration Suite with Gemini API Integration

## Project Overview

This repository contains two main systems:

### 1. Multi-Agent Orchestration Suite (TypeScript/Node.js)
Located in root directory - A 4-agent coordinated build system for "Dagar om Lagar 2025" streaming platform.

**See:** [`october/README.md`](october/README.md) for detailed orchestration documentation.

### 2. Browser-Based Gemini API Integration (JavaScript/ES6+)
Located in `october/` directory - A browser-based Gemini API integration for Swedish Health Bus Schedule System.

**See:** [`october/INTEGRATION_README.md`](october/INTEGRATION_README.md) for browser integration documentation.

## Quick Start

### For Orchestration Suite (TypeScript)

```bash
# Install dependencies
bun install

# Set up environment variables
export GEMINI_API_KEY="your-key"
export OPENAI_API_KEY="your-key"
export ANTHROPIC_API_KEY="your-key"

# Run full orchestration
make all
```

### For Browser Integration (JavaScript)

```bash
# Serve the october directory
cd october
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

## Environment Setup

Create a `.env` file in the root directory (see `.env.example`):

```bash
# Required for Orchestration
GEMINI_API_KEY=your-gemini-api-key-here
OPENAI_API_KEY=your-openai-api-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key-here

# Optional for final build
NEXT_PUBLIC_YOUTUBE_API_KEY=your-youtube-api-key-here
INFRANODUS_API_KEY=your-infranodus-api-key-here
```

**⚠️ IMPORTANT:** Never commit the `.env` file to git! It's already in `.gitignore`.

## Project Structure

```
DolReal/
├── .github/                  # GitHub workflows and configurations
├── artifacts/               # Generated artifacts from agents
├── docs/                    # Documentation
├── october/                 # Browser-based Gemini integration
│   ├── modules/            # ES6+ modules
│   │   ├── gemini-api-module.js
│   │   ├── utility.js
│   │   └── validation.js
│   ├── index.html          # Main UI
│   ├── scripts.js          # Application logic
│   ├── style.css           # Styling
│   ├── README.md           # Orchestration docs
│   └── INTEGRATION_README.md  # Browser integration docs
├── plans/                   # Planning documents
├── prompts/                 # Agent prompts
├── schemas/                 # JSON schemas
├── scripts/                 # Orchestration scripts (TypeScript)
│   ├── gem.ts              # Gemini wrapper
│   ├── anthropic.ts        # Anthropic wrapper
│   ├── orchestrate.ts      # Main orchestrator
│   ├── run-agent.ts        # Individual agent runner
│   └── check-env.ts        # Environment checker
├── src/                     # Next.js application source
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── Makefile                # Build commands
├── package.json            # Dependencies
└── README.md               # This file
```

## Features

### Orchestration Suite
- 🤖 4-agent coordinated pipeline
- 📦 File-based async communication
- ⚡ Parallel execution for Claude agents
- 🔍 Status monitoring and validation
- 📊 Artifact generation and tracking

### Browser Integration
- 🔐 Secure API key management
- ✅ Validation system (API, environment, browser)
- 🇸🇪 Complete Swedish UI
- 📱 Responsive design
- ♿ WCAG-compliant accessibility
- 🔄 Retry logic and error handling

## API Key Management

### Getting API Keys

1. **Gemini API**: [Google AI Studio](https://aistudio.google.com/apikey)
2. **OpenAI API**: [OpenAI Platform](https://platform.openai.com/api-keys)
3. **Anthropic API**: [Anthropic Console](https://console.anthropic.com/)

### Security Best Practices

✅ **DO:**
- Store API keys in `.env` files (never in code)
- Use environment variables for production
- Mask API keys in UI (type="password")
- Use HTTPS for production deployments
- Implement rate limiting
- Monitor API usage and costs

❌ **DON'T:**
- Hardcode API keys in source code
- Commit `.env` files to git
- Share API keys in plaintext
- Use the same key for dev and prod
- Expose keys in client-side code

## Validation

### Check Environment Variables

```bash
# Using TypeScript script
bun run scripts/check-env.ts

# Or using Makefile
make check-env
```

### Browser Validation

Open the browser integration UI and click "Validera allt" (Validate All) to check:
- ✓ Gemini API configuration
- ✓ Environment setup
- ✓ Browser compatibility
- ✓ Network connectivity

## Development

### TypeScript/Node.js Development

```bash
# Install dependencies
bun install

# Run individual agents
make gemini-ultra      # Research agent
make gpt5-codex        # Architecture agent
make claude-frontend   # Frontend agent
make claude-backend    # Backend agent
make gemini-cli        # Integration agent

# Run parallel Claude agents
make claude-parallel

# Check status
make status

# Clean artifacts
make clean
```

### Browser Development

```bash
# Serve locally
cd october
python3 -m http.server 8000

# Open in browser
# Navigate to http://localhost:8000
```

## Testing

### Orchestration Testing
```bash
# Run full orchestration (takes 50-70 minutes)
make all

# Check generated artifacts
ls -la artifacts/
```

### Browser Integration Testing
1. Open `october/index.html` in browser
2. Configure API key
3. Click "Testa anslutning" (Test Connection)
4. Run "Validera allt" (Validate All)
5. Try generating content with a test prompt

## Troubleshooting

### Common Issues

**API Key Not Working**
- Verify key format (Gemini keys start with "AIza")
- Check that API is enabled in Google Cloud Console
- Ensure no extra spaces in the key

**CORS Errors**
- Use a local web server instead of opening HTML directly
- Ensure HTTPS for production
- Consider implementing a backend proxy

**Module Loading Errors**
- Verify browser supports ES6 modules
- Check file paths are correct
- Ensure running via HTTP server (not file://)

**Environment Variables Not Found**
- Check `.env` file exists and is in correct location
- Verify environment variables are exported
- Run `make check-env` to validate

### Getting Help

1. Check documentation in `october/INTEGRATION_README.md`
2. Review troubleshooting sections
3. Check [Gemini API documentation](https://ai.google.dev/docs)
4. Open an issue on GitHub

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

### Coding Standards

- **TypeScript**: Follow existing patterns in `scripts/`
- **JavaScript**: ES6+ modules with JSDoc comments
- **Swedish UI**: All user-facing text in Swedish
- **Accessibility**: Maintain WCAG 2.2 AA compliance
- **Security**: Never commit secrets or API keys

## License

MIT License - See LICENSE file for details

## Documentation

- [Multi-Agent Orchestration](october/README.md)
- [Browser Gemini Integration](october/INTEGRATION_README.md)
- [InfraNodus Integration](plans/infranodus_plan.md)
- [Agent Prompts](prompts/)

## Project Status

**Version**: 2.0.0  
**Status**: Active Development  
**Last Updated**: 2025-10-14

### Recent Updates

- ✅ Browser-based Gemini API integration
- ✅ ES6+ modular architecture
- ✅ Swedish UI implementation
- ✅ Validation system
- ✅ Secure secret management
- ✅ Comprehensive documentation

---

**DolReal - Dagar om Lagar 2025**  
Multi-Agent Orchestration Suite with Gemini API Integration  
© 2025
