# Interactive Multi-Agent Orchestration

**Use your authenticated browser sessions - no API keys needed!**

---

## Quick Start

```bash
cd /Users/air/DoL-2025/DolReal
./scripts/interactive-orchestrate.sh
```

The script will guide you through each agent step-by-step.

---

## How It Works

1. **Script copies prompt to clipboard**
2. **You paste into your authenticated web interface** (Gemini, ChatGPT, Claude)
3. **Wait for complete response**
4. **Copy response to clipboard**
5. **Press ENTER in terminal**
6. **Script saves response and moves to next agent**

---

## Workflow

### Agent 1: Gemini 2.5 Pro Ultra (Research)
- **Open**: https://gemini.google.com/app
- **Time**: ~10-15 minutes
- **Output**: `artifacts/1_gemini_ultra_research.json`

### Agent 2: GPT-5 Codex (Architecture)
- **Open**: https://chat.openai.com
- **Time**: ~5-10 minutes
- **Output**: `artifacts/2_gpt5_codex_architecture.json`
- **Note**: Receives research from Agent 1

### Agent 3a & 3b: Claude Sonnet 4.5 (Parallel)
- **Open TWO sessions**: https://claude.ai
  - Session 1: Frontend
  - Session 2: Backend
- **Time**: ~15-20 minutes (in parallel)
- **Output**: 
  - `artifacts/3a_claude_frontend_output.json`
  - `artifacts/3b_claude_backend_output.json`
- **Note**: Both receive research + architecture

### Agent 4: Gemini 2.5 Pro CLI (Integration)
- **Open**: https://gemini.google.com/app
- **Time**: ~5-10 minutes
- **Output**: `artifacts/4_gemini_cli_final.json`
- **Note**: Receives both Claude outputs

---

## Requirements

✅ **Browser sessions logged in:**
- Gemini (with Pro/Ultra subscription)
- ChatGPT (with GPT-5 Codex access)
- Claude (with Sonnet 4.5 access)

✅ **Clipboard tool:**
- macOS: `pbcopy`/`pbpaste` (built-in)
- Linux: `xclip` (install: `sudo apt-get install xclip`)

✅ **Optional:**
- `jq` for JSON validation: `brew install jq`

---

## Advantages

✅ **No API costs** - uses your existing subscriptions
✅ **Web interface features** - access to latest models
✅ **Session persistence** - keep context between runs
✅ **Visual feedback** - see responses as they generate
✅ **Easy retry** - just re-paste if something fails

---

## Tips

1. **Keep browser tabs open** throughout the process
2. **Wait for complete responses** before copying (look for stop/regenerate buttons)
3. **Copy EVERYTHING** including JSON code blocks
4. **Use Cmd+A, Cmd+C** (macOS) or Ctrl+A, Ctrl+C (Linux) to copy full response
5. **Parallel Claudes**: Open two separate Claude chat sessions in different tabs/windows

---

## Troubleshooting

### Clipboard not working
```bash
# macOS - test clipboard
echo "test" | pbcopy && pbpaste

# Linux - install xclip
sudo apt-get install xclip
echo "test" | xclip -selection clipboard && xclip -selection clipboard -o
```

### JSON validation error
```bash
# Check if output is valid JSON
jq empty artifacts/1_gemini_ultra_research.json

# Pretty-print to see structure
jq . artifacts/1_gemini_ultra_research.json
```

### Agent response incomplete
1. Wait longer for model to finish
2. Check if response was cut off (look for incomplete JSON)
3. Try "Continue" or "Regenerate" in web interface
4. Copy the full combined response

### Skip completed agents
The script checks for existing artifacts. If found, it asks if you want to regenerate.

---

## Check Progress

```bash
# View status
make status

# View artifact contents
cat artifacts/1_gemini_ultra_research.json | jq .

# View all artifacts
ls -lh artifacts/*.json
```

---

## After Completion

```bash
# All 5 artifacts should exist:
ls artifacts/
# 1_gemini_ultra_research.json
# 2_gpt5_codex_architecture.json
# 3a_claude_frontend_output.json
# 3b_claude_backend_output.json
# 4_gemini_cli_final.json

# Extract code from artifacts and build
# (Agent 4 output contains final merged code)
jq -r '.components[].code' artifacts/3a_claude_frontend_output.json > /tmp/frontend.txt
jq -r '.api_routes[].code' artifacts/3b_claude_backend_output.json > /tmp/backend.txt
```

---

## Estimated Timeline

| Agent | Interface | Time |
|-------|-----------|------|
| 1. Research | Gemini Ultra | 10-15 min |
| 2. Architecture | GPT-5 Codex | 5-10 min |
| 3a. Frontend | Claude #1 | 15-20 min |
| 3b. Backend | Claude #2 | 15-20 min (parallel) |
| 4. Integration | Gemini CLI | 5-10 min |
| **Total** | | **50-70 min** |

*(Parallel Claude execution saves 15-20 min)*

---

## Comparison: Interactive vs API

| | **Interactive** | **API** |
|---|---|---|
| **Cost** | Subscription only | Per-token billing |
| **Setup** | None (already logged in) | API keys required |
| **Features** | Full web UI | API limitations |
| **Context** | Persistent sessions | Stateless |
| **Control** | Manual checkpoints | Automated |
| **Time** | 50-70 min (active) | 50-70 min (passive) |

---

## Ready to Start?

```bash
./scripts/interactive-orchestrate.sh
```

The script will guide you step-by-step through the entire orchestration!
