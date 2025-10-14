#!/usr/bin/env bash
# Interactive Multi-Agent Orchestration
# Uses your authenticated web sessions (no API keys needed)

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Directories
PROMPTS_DIR="prompts"
ARTIFACTS_DIR="artifacts"
PLANS_DIR="plans"

# Create directories
mkdir -p "$ARTIFACTS_DIR" "$PLANS_DIR"

echo -e "${CYAN}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  DoL 2025 Interactive Multi-Agent Orchestration         ║${NC}"
echo -e "${CYAN}║  No API keys needed - uses your authenticated sessions  ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Function to handle each agent
run_agent() {
    local agent_num=$1
    local agent_name=$2
    local prompt_file=$3
    local output_file=$4
    local model_interface=$5
    local prev_artifacts=$6

    echo -e "${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${MAGENTA}  Agent ${agent_num}: ${agent_name}${NC}"
    echo -e "${MAGENTA}  Interface: ${model_interface}${NC}"
    echo -e "${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    # Check if already completed
    if [ -f "$output_file" ]; then
        echo -e "${YELLOW}⚠️  Output already exists: ${output_file}${NC}"
        echo -n "Regenerate? (y/N): "
        read -r response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            echo -e "${GREEN}✓ Skipping (using existing output)${NC}"
            echo ""
            return 0
        fi
    fi

    # Prepare input
    local input_file="/tmp/agent_${agent_num}_input.md"
    cp "$prompt_file" "$input_file"

    # Append previous artifacts if specified
    if [ -n "$prev_artifacts" ]; then
        echo "" >> "$input_file"
        echo "## Input Artifacts from Previous Agents" >> "$input_file"
        echo "" >> "$input_file"
        for artifact in $prev_artifacts; do
            if [ -f "$artifact" ]; then
                echo "### $(basename $artifact)" >> "$input_file"
                echo '```json' >> "$input_file"
                cat "$artifact" >> "$input_file"
                echo '```' >> "$input_file"
                echo "" >> "$input_file"
            fi
        done
    fi

    echo -e "${CYAN}📄 Prompt prepared: ${input_file}${NC}"
    echo -e "${BLUE}   Preview:${NC}"
    head -n 5 "$input_file" | sed 's/^/   /'
    echo -e "   ${YELLOW}...${NC}"
    echo ""

    # Copy to clipboard
    echo -e "${YELLOW}Copying prompt to clipboard...${NC}"
    if command -v pbcopy &> /dev/null; then
        cat "$input_file" | pbcopy
        echo -e "${GREEN}✓ Prompt copied to clipboard (pbcopy)${NC}"
    elif command -v xclip &> /dev/null; then
        cat "$input_file" | xclip -selection clipboard
        echo -e "${GREEN}✓ Prompt copied to clipboard (xclip)${NC}"
    else
        echo -e "${YELLOW}⚠️  Could not find clipboard tool${NC}"
        echo -e "${BLUE}   Read prompt from: ${input_file}${NC}"
    fi

    echo ""
    echo -e "${CYAN}╭─────────────────────────────────────────────────────────╮${NC}"
    echo -e "${CYAN}│  ACTION REQUIRED:                                       │${NC}"
    echo -e "${CYAN}│                                                         │${NC}"
    echo -e "${CYAN}│  1. Open ${model_interface} in your browser${NC}"
    echo -e "${CYAN}│  2. Paste the prompt (already in clipboard)            │${NC}"
    echo -e "${CYAN}│  3. Submit and wait for complete response              │${NC}"
    echo -e "${CYAN}│  4. Copy the ENTIRE response (JSON output)             │${NC}"
    echo -e "${CYAN}│  5. Return here and press ENTER                        │${NC}"
    echo -e "${CYAN}╰─────────────────────────────────────────────────────────╯${NC}"
    echo ""

    # Wait for user
    echo -n "Press ENTER when response is ready in clipboard..."
    read -r

    # Paste from clipboard
    echo ""
    echo -e "${YELLOW}Saving response from clipboard...${NC}"
    
    if command -v pbpaste &> /dev/null; then
        pbpaste > "$output_file"
    elif command -v xclip &> /dev/null; then
        xclip -selection clipboard -o > "$output_file"
    else
        echo -e "${RED}✗ Could not read from clipboard${NC}"
        echo -n "Enter path to response file: "
        read -r response_path
        if [ -f "$response_path" ]; then
            cp "$response_path" "$output_file"
        else
            echo -e "${RED}✗ File not found: ${response_path}${NC}"
            return 1
        fi
    fi

    # Validate JSON
    if command -v jq &> /dev/null; then
        if jq empty "$output_file" 2>/dev/null; then
            echo -e "${GREEN}✓ Valid JSON saved to: ${output_file}${NC}"
        else
            echo -e "${YELLOW}⚠️  Response saved but may not be valid JSON${NC}"
            echo -e "${BLUE}   File: ${output_file}${NC}"
        fi
    else
        echo -e "${GREEN}✓ Response saved to: ${output_file}${NC}"
        echo -e "${YELLOW}   (Install 'jq' for JSON validation)${NC}"
    fi

    echo ""
    sleep 1
}

# ============================================================================
# Agent Pipeline
# ============================================================================

echo -e "${BLUE}Starting interactive orchestration...${NC}"
echo ""

# Agent 1: Gemini 2.5 Pro Ultra (Research)
run_agent \
    "1" \
    "Gemini 2.5 Pro Ultra - Research & Planning" \
    "$PROMPTS_DIR/1_gemini_ultra_research.md" \
    "$ARTIFACTS_DIR/1_gemini_ultra_research.json" \
    "gemini.google.com/app" \
    ""

# Agent 2: GPT-5 Codex (Architecture)
run_agent \
    "2" \
    "GPT-5 Codex - System Architecture" \
    "$PROMPTS_DIR/2_gpt5_codex_architecture.md" \
    "$ARTIFACTS_DIR/2_gpt5_codex_architecture.json" \
    "chat.openai.com" \
    "$ARTIFACTS_DIR/1_gemini_ultra_research.json"

# Agent 3a: Claude Frontend
echo -e "${CYAN}Next: Running both Claude agents in parallel${NC}"
echo -e "${YELLOW}You'll need TWO Claude chat sessions open${NC}"
echo -e "${BLUE}  - Session 1: Frontend (Agent 3a)${NC}"
echo -e "${BLUE}  - Session 2: Backend (Agent 3b)${NC}"
echo ""
echo -n "Ready? Press ENTER to continue..."
read -r

run_agent \
    "3a" \
    "Claude Sonnet 4.5 #1 - Frontend" \
    "$PROMPTS_DIR/3a_claude_frontend.md" \
    "$ARTIFACTS_DIR/3a_claude_frontend_output.json" \
    "claude.ai (Session 1)" \
    "$ARTIFACTS_DIR/1_gemini_ultra_research.json $ARTIFACTS_DIR/2_gpt5_codex_architecture.json"

# Agent 3b: Claude Backend
run_agent \
    "3b" \
    "Claude Sonnet 4.5 #2 - Backend & Docs" \
    "$PROMPTS_DIR/3b_claude_backend.md" \
    "$ARTIFACTS_DIR/3b_claude_backend_output.json" \
    "claude.ai (Session 2)" \
    "$ARTIFACTS_DIR/1_gemini_ultra_research.json $ARTIFACTS_DIR/2_gpt5_codex_architecture.json"

# Agent 4: Gemini CLI (Integration)
run_agent \
    "4" \
    "Gemini 2.5 Pro CLI - Final Integration" \
    "$PROMPTS_DIR/4_gemini_cli_final.md" \
    "$ARTIFACTS_DIR/4_gemini_cli_final.json" \
    "gemini.google.com/app" \
    "$ARTIFACTS_DIR/3a_claude_frontend_output.json $ARTIFACTS_DIR/3b_claude_backend_output.json"

# ============================================================================
# Completion
# ============================================================================

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✓ Interactive Orchestration Complete!                  ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${CYAN}Generated Artifacts:${NC}"
ls -lh "$ARTIFACTS_DIR"/*.json 2>/dev/null || echo "  No artifacts found"
echo ""

echo -e "${CYAN}Next Steps:${NC}"
echo -e "  1. Review artifacts in ${ARTIFACTS_DIR}/"
echo -e "  2. Extract and implement code from agent outputs"
echo -e "  3. Build the Next.js application"
echo ""

echo -e "${BLUE}Check status:${NC}  make status"
echo -e "${BLUE}View artifacts:${NC}  cat artifacts/*.json | jq"
echo ""
