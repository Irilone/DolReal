# Quick Start Guide - DolReal

Get up and running with DolReal in 5 minutes!

## Prerequisites

You need:
- A computer with macOS, Linux, or Windows
- Internet connection
- 15 minutes of your time

## Step 1: Install Required Software (5 minutes)

### Install Node.js

**macOS/Linux:**
```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

**Windows:**
Download and install from [nodejs.org](https://nodejs.org/) (choose LTS version 20.x)

**Verify installation:**
```bash
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### Install Git (if not already installed)

**macOS:**
```bash
brew install git
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install git
```

**Windows:**
Download from [git-scm.com](https://git-scm.com/download/win)

**Verify installation:**
```bash
git --version
```

### Optional: Install Bun (Faster Alternative to npm)

**macOS/Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Windows:**
```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

## Step 2: Clone the Repository (1 minute)

```bash
# Clone the repository
git clone https://github.com/Irilone/DolReal.git

# Navigate into the directory
cd DolReal
```

## Step 3: Install Dependencies (2-3 minutes)

**Using npm (default):**
```bash
npm install
```

**OR using Bun (faster):**
```bash
bun install
```

Wait for the installation to complete. This may take a few minutes depending on your internet speed.

## Step 4: Set Up Environment Variables (1 minute)

```bash
# Copy the example environment file
cp .env.example .env

# Open .env in your text editor
# For macOS/Linux:
nano .env

# For Windows:
notepad .env
```

Add your API keys (you'll need these for the AI agents):
```env
GEMINI_API_KEY=your-key-here
OPENAI_API_KEY=your-key-here
ANTHROPIC_API_KEY=your-key-here
```

**Don't have API keys yet?** That's okay! The development server will still run. You'll just need them later for the AI orchestration features.

## Step 5: Start the Development Server (30 seconds)

```bash
npm run dev
```

**OR with Bun:**
```bash
bun run dev
```

You should see:

## Step 6: Open in Browser (5 seconds)

Open your web browser and go to:
```
http://localhost:3000
```

🎉 **Congratulations!** You're now running DolReal locally!

---

## What's Next?

### Explore the Application

- **Home Page**: See the 4 live streams layout
- **Archive**: Browse past streams
- **Schedule**: View event schedule
- **About**: Learn about the project

### Learn More

- 📖 Read the full [README.md](README.md) for detailed documentation
- 🤝 Check [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- 🛠️ Explore the codebase in the `src/` directory

### Common Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Type check
npm run typecheck

# Lint code
npm run lint

# Format code
npm run format
```

### Get Help

- 🐛 Report bugs: [GitHub Issues](https://github.com/Irilone/DolReal/issues)
- 💬 Ask questions: [GitHub Discussions](https://github.com/Irilone/DolReal/discussions)
- 📧 Email: Contact the DoL 2025 Team

---

## Troubleshooting

### Port 3000 is already in use

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Module not found errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build fails

```bash
# Check for TypeScript errors
npm run typecheck

# Check for linting errors
npm run lint
```

### Still stuck?

Check the [full troubleshooting guide](README.md#troubleshooting) in README.md

---

## Getting API Keys

### Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add to `.env`

### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key and add to `.env`

### Anthropic API Key
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign in or create an account
3. Navigate to API Keys
4. Create a new key
5. Copy the key and add to `.env`

**Note**: Some of these services may require payment or have free tiers with limitations.

---

## Quick Command Reference

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Run tests | `npm test` |
| Type check | `npm run typecheck` |
| Lint code | `npm run lint` |
| Format code | `npm run format` |
| Clean build artifacts | `npm run clean` |

---

**Happy coding! 🚀**

For more detailed instructions, see the [full README](README.md).
