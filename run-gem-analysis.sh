#!/usr/bin/env bash
#
# DoL 2025 - Gemini 2.5 Pro Ultra Analysis via gem CLI
# Uses the "gem" coding partner with Ultra subscription and deep thinking mode
#

set -euo pipefail

# Colors
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🧠 Gemini 2.5 Pro Ultra Deep Analysis${NC}"
echo -e "${BLUE}═══════════════════════════════════${NC}\n"

# Check for gem CLI
if ! command -v gem &> /dev/null; then
    echo -e "${RED}❌ Error: 'gem' CLI not found${NC}"
    echo -e "${YELLOW}💡 Install: brew install gemini-cli${NC}"
    echo -e "${YELLOW}💡 Or use: npm install -g @google/generative-ai-cli${NC}"
    exit 1
fi

# Check for GEMINI_API_KEY
if [[ -z "${GEMINI_API_KEY:-}" ]]; then
    echo -e "${RED}❌ Error: GEMINI_API_KEY not set${NC}"
    echo -e "${YELLOW}💡 Set with: export GEMINI_API_KEY='your-key'${NC}"
    echo -e "${YELLOW}💡 Or load from .env: source .env${NC}"
    exit 1
fi

echo -e "${GREEN}✅ gem CLI found${NC}"
echo -e "${GREEN}✅ GEMINI_API_KEY set${NC}\n"

# Choose prompt version
echo -e "${YELLOW}Choose analysis depth:${NC}"
echo -e "  ${BLUE}1${NC}) Quick Analysis (v1 - ~15min)"
echo -e "  ${BLUE}2${NC}) Deep Analysis (v2 - ~30min)"
echo -e "  ${BLUE}3${NC}) Custom prompt"
read -p "Selection [2]: " CHOICE
CHOICE=${CHOICE:-2}

case $CHOICE in
    1)
        PROMPT_FILE="GEM_ULTRA_PROMPT_v1.md"
        ;;
    2)
        PROMPT_FILE="GEM_ULTRA_PROMPT_v2.md"
        ;;
    3)
        read -p "Enter prompt file path: " PROMPT_FILE
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

if [[ ! -f "$PROMPT_FILE" ]]; then
    echo -e "${RED}❌ Error: $PROMPT_FILE not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Using prompt: $PROMPT_FILE${NC}\n"

# Create output directory
OUTPUT_DIR="gemini-ultra-analysis"
mkdir -p "$OUTPUT_DIR"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
OUTPUT_FILE="${OUTPUT_DIR}/gem_ultra_analysis_${TIMESTAMP}.md"

echo -e "${BLUE}🚀 Starting Gemini 2.5 Pro Ultra Analysis...${NC}"
echo -e "${YELLOW}⏰ This will take 15-35 minutes with deep thinking mode enabled${NC}"
echo -e "${YELLOW}📂 Output: $OUTPUT_FILE${NC}\n"

# Run gem analysis with deep thinking enabled
echo -e "${BLUE}Command: gem analyze --model gemini-2.5-pro-002 --deep-thinking --context ./src${NC}\n"

# Attempt different gem CLI syntaxes (different tools have different commands)
if gem help | grep -q "analyze"; then
    # If gem has analyze command
    gem analyze \
        --model gemini-2.5-pro-002 \
        --deep-thinking \
        --context ./src \
        --instructions "$PROMPT_FILE" \
        | tee "$OUTPUT_FILE"

elif gem help | grep -q "chat"; then
    # If gem uses chat command
    cat "$PROMPT_FILE" | gem chat \
        --model gemini-2.5-pro-002 \
        --context ./src \
        | tee "$OUTPUT_FILE"

elif command -v gemini-cli &> /dev/null; then
    # Fallback to gemini-cli
    gemini-cli chat \
        --model gemini-2.5-pro-002 \
        < "$PROMPT_FILE" \
        | tee "$OUTPUT_FILE"

else
    echo -e "${RED}❌ Error: Could not determine gem CLI syntax${NC}"
    echo -e "${YELLOW}💡 Trying direct pipe method...${NC}\n"

    cat "$PROMPT_FILE" | gem | tee "$OUTPUT_FILE"
fi

# Check if output was created
if [[ -f "$OUTPUT_FILE" && -s "$OUTPUT_FILE" ]]; then
    echo -e "\n${GREEN}✅ Analysis complete!${NC}"
    echo -e "${GREEN}📄 Report: $OUTPUT_FILE${NC}\n"

    FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
    LINE_COUNT=$(wc -l < "$OUTPUT_FILE")

    echo -e "${BLUE}📏 Report size: $FILE_SIZE${NC}"
    echo -e "${BLUE}📝 Report lines: $LINE_COUNT${NC}\n"

    # Parse for critical findings
    if grep -q "BUILD ERROR" "$OUTPUT_FILE"; then
        echo -e "${YELLOW}⚠️  Build errors found - check report${NC}"
    fi

    if grep -q "SUCCESS" "$OUTPUT_FILE"; then
        echo -e "${GREEN}✅ Build successful${NC}"
    fi

    echo -e "\n${YELLOW}💡 Next steps:${NC}"
    echo -e "   1. Review: ${BLUE}cat $OUTPUT_FILE | less${NC}"
    echo -e "   2. Implement fixes from report"
    echo -e "   3. Test build: ${BLUE}bun run build${NC}"
    echo -e "   4. Deploy: ${BLUE}vercel --prod${NC}\n"

    # Offer to open in editor
    read -p "Open report in editor? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        ${EDITOR:-code} "$OUTPUT_FILE"
    fi

else
    echo -e "\n${RED}❌ Error: Analysis failed or output empty${NC}"
    echo -e "${YELLOW}💡 Check your API key and network${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Done! Happy optimizing! 🚀${NC}"
