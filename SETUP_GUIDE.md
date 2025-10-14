# DolReal Setup Guide - Gemini API Integration

Complete setup instructions for both TypeScript orchestration and browser-based Gemini integration.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [API Key Configuration](#api-key-configuration)
4. [Browser Integration Setup](#browser-integration-setup)
5. [Orchestration Suite Setup](#orchestration-suite-setup)
6. [Validation](#validation)
7. [Common Issues](#common-issues)

## Prerequisites

### System Requirements

- **Node.js**: v18+ (for orchestration)
- **Bun**: Latest version (recommended) or npm/yarn
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Python 3**: For local HTTP server (optional)
- **Git**: For version control

### Browser Requirements

The browser integration requires:
- ✅ ES6 Module support
- ✅ Fetch API
- ✅ LocalStorage
- ✅ JavaScript enabled
- ✅ HTTPS (recommended for production)

Check compatibility at: [caniuse.com](https://caniuse.com)

## Initial Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/Irilone/DolReal.git
cd DolReal
```

### Step 2: Install Dependencies

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install

# Or using yarn
yarn install
```

### Step 3: Copy Environment Template

```bash
cp .env.example .env
```

## API Key Configuration

### Option 1: For Orchestration (Required)

Edit `.env` file in the root directory:

```bash
# Gemini API (Agents 1 & 4)
GEMINI_API_KEY=AIzaSyDP3wr_5BsxXDIOxvx0X1vIjBDnVgH8yhE

# OpenAI API (Agent 2)
OPENAI_API_KEY=sk-your-openai-key

# Anthropic API (Agents 3a & 3b)
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key

# Optional: For final build
NEXT_PUBLIC_YOUTUBE_API_KEY=your-youtube-key
INFRANODUS_API_KEY=your-infranodus-key
```

**Getting API Keys:**

1. **Gemini**: https://aistudio.google.com/apikey
   - Sign in with Google account
   - Click "Create API Key"
   - Copy the key (starts with `AIza`)

2. **OpenAI**: https://platform.openai.com/api-keys
   - Create account
   - Navigate to API keys
   - Create new secret key

3. **Anthropic**: https://console.anthropic.com/
   - Sign up for account
   - Go to API section
   - Generate API key

### Option 2: For Browser Integration (Alternative)

For the browser-based system, you can configure the API key via:

**Method A: LocalStorage (Development)**
1. Open `october/index.html` in browser
2. Enter API key in the form
3. Click "Spara API-nyckel" (Save API Key)

**Method B: Environment Variables (Production)**
Set `window.ENV` in your server-side rendering:

```html
<script>
  window.ENV = {
    GEMINI_API_KEY: '<?= getenv("GEMINI_API_KEY") ?>'
  };
</script>
```

## Browser Integration Setup

### Development Setup

#### Option 1: Python HTTP Server

```bash
cd october
python3 -m http.server 8000
```

Open: http://localhost:8000

#### Option 2: Node.js HTTP Server

```bash
cd october
npx http-server -p 8000
```

Open: http://localhost:8000

#### Option 3: PHP Server

```bash
cd october
php -S localhost:8000
```

Open: http://localhost:8000

### Production Setup

For production deployment:

1. **Use HTTPS**: Essential for secure API communication
2. **Backend Proxy**: Recommended to hide API keys
3. **Rate Limiting**: Implement request throttling
4. **Error Logging**: Monitor and log API errors
5. **Cost Monitoring**: Track API usage

Example Nginx configuration:

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    root /path/to/DolReal/october;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

## Orchestration Suite Setup

### Verify Environment

```bash
# Check all environment variables
bun run scripts/check-env.ts

# Or use Makefile
make check-env
```

Expected output:
```
✅ GEMINI_API_KEY: AIzaSy...
✅ OPENAI_API_KEY: sk-...
✅ ANTHROPIC_API_KEY: sk-ant-...
```

### Run Individual Agents

```bash
# Agent 1: Gemini Ultra (Research)
make gemini-ultra

# Agent 2: GPT-5 Codex (Architecture)
make gpt5-codex

# Agents 3a & 3b: Claude (Frontend & Backend)
make claude-parallel

# Agent 4: Gemini CLI (Integration)
make gemini-cli
```

### Run Full Orchestration

```bash
# Complete pipeline (50-70 minutes)
make all

# Or using npm scripts
bun run orchestrate
```

## Validation

### Browser Integration Validation

1. Open browser integration: http://localhost:8000
2. Configure API key
3. Click "Validera allt" (Validate All)

Expected checks:
- ✓ Gemini API configured and accessible
- ✓ Environment variables present
- ✓ Browser compatibility confirmed
- ✓ HTTPS enabled (for production)

### Orchestration Validation

```bash
# Quick environment check
make check-env

# Test Gemini connection
curl "https://generativelanguage.googleapis.com/v1beta/models?key=$GEMINI_API_KEY"

# Verify artifacts directory
ls -la artifacts/

# Check status of completed agents
make status
```

## Common Issues

### Issue 1: API Key Not Working

**Symptoms:**
- "Invalid API key" error
- "API error: 400" messages
- Authentication failures

**Solutions:**
1. Verify key format (Gemini: starts with `AIza`)
2. Check for extra spaces or newlines
3. Ensure API is enabled in Google Cloud Console
4. Regenerate the API key if needed

```bash
# Test API key
curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_KEY"
```

### Issue 2: CORS Errors in Browser

**Symptoms:**
- "Access to fetch has been blocked by CORS policy"
- Network errors in browser console

**Solutions:**
1. Use a local web server (not file://)
2. Ensure HTTPS for production
3. Implement backend proxy for API calls

```bash
# Start local server
cd october && python3 -m http.server 8000
```

### Issue 3: Module Loading Errors

**Symptoms:**
- "Failed to load module"
- "Unexpected token 'export'"
- Module import errors

**Solutions:**
1. Verify browser supports ES6 modules
2. Check script tags use `type="module"`
3. Ensure correct file paths
4. Use HTTP server (not direct file access)

```html
<!-- Correct -->
<script type="module" src="./scripts.js"></script>

<!-- Incorrect -->
<script src="./scripts.js"></script>
```

### Issue 4: LocalStorage Not Available

**Symptoms:**
- "LocalStorage inte tillgänglig"
- Settings not persisting

**Solutions:**
1. Enable cookies/storage in browser settings
2. Check for private browsing mode
3. Verify browser supports localStorage
4. Clear browser cache and try again

### Issue 5: Environment Variables Not Found

**Symptoms:**
- "GEMINI_API_KEY not set"
- Environment check failures

**Solutions:**
1. Ensure `.env` file exists in root
2. Verify correct format (no quotes unless needed)
3. Export variables for current shell:

```bash
export $(cat .env | xargs)
```

4. Check file permissions:

```bash
chmod 600 .env
```

### Issue 6: Rate Limiting

**Symptoms:**
- "Too many requests" (429 errors)
- API quota exceeded messages

**Solutions:**
1. Implement request throttling
2. Add delays between API calls
3. Use exponential backoff
4. Upgrade API plan if needed
5. Monitor usage dashboard

```javascript
// Add delay between requests
await new Promise(resolve => setTimeout(resolve, 1000));
```

## Testing Your Setup

### Quick Test Checklist

- [ ] Environment variables loaded
- [ ] API keys validated
- [ ] Browser integration accessible
- [ ] Orchestration runs successfully
- [ ] Validation checks pass
- [ ] Test prompt generates content
- [ ] No console errors

### Automated Testing

```bash
# Run environment check
make check-env

# Test browser integration
# 1. Open http://localhost:8000
# 2. Click "Validera allt"
# 3. Try test generation

# Test orchestration
make gemini-ultra
# Check artifacts/1_gemini_ultra_research.json exists
```

## Next Steps

After successful setup:

1. **Read Documentation**
   - [Browser Integration](october/INTEGRATION_README.md)
   - [Orchestration Suite](october/README.md)

2. **Try Examples**
   - Generate test content in browser
   - Run individual agents
   - Execute full orchestration

3. **Configure for Production**
   - Set up HTTPS
   - Implement backend proxy
   - Configure monitoring
   - Set up rate limiting

4. **Monitor Usage**
   - Check API dashboards
   - Review cost metrics
   - Monitor error logs

## Support

If you encounter issues not covered here:

1. Check detailed documentation in `october/INTEGRATION_README.md`
2. Review [Gemini API docs](https://ai.google.dev/docs)
3. Search existing GitHub issues
4. Open a new issue with:
   - Error messages
   - Browser/Node version
   - Steps to reproduce
   - Console logs (redact API keys!)

## Security Reminders

⚠️ **NEVER:**
- Commit `.env` files
- Share API keys publicly
- Hardcode secrets in code
- Use production keys in development
- Expose keys in client-side code

✅ **ALWAYS:**
- Use `.gitignore` for sensitive files
- Rotate keys regularly
- Monitor API usage
- Implement rate limiting
- Use HTTPS in production

---

**Setup Guide Version**: 1.0.0  
**Last Updated**: 2025-10-14  
**Next Review**: When new features are added

For the latest setup instructions, see: https://github.com/Irilone/DolReal
