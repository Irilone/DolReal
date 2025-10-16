#!/usr/bin/env bash
#
# DoL 2025 - Gemini 2.5 Pro Ultra Deep Analysis Runner
# This script sends the comprehensive analysis prompt to Gemini with deep thinking enabled
#

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧠 DoL 2025 - Gemini Deep Analysis Runner${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}\n"

# Check if GEMINI_API_KEY is set
if [[ -z "${GEMINI_API_KEY:-}" ]]; then
    echo -e "${RED}❌ Error: GEMINI_API_KEY environment variable not set${NC}"
    echo -e "${YELLOW}💡 Set it with: export GEMINI_API_KEY='your-api-key'${NC}"
    echo -e "${YELLOW}💡 Or load from .env: source .env${NC}"
    exit 1
fi

echo -e "${GREEN}✅ GEMINI_API_KEY found${NC}\n"

# Check if gemini-cli is installed
if command -v gemini-cli &> /dev/null; then
    CLI_TOOL="gemini-cli"
    echo -e "${GREEN}✅ gemini-cli detected${NC}"
elif command -v gem &> /dev/null; then
    CLI_TOOL="gem"
    echo -e "${GREEN}✅ gem CLI detected${NC}"
else
    echo -e "${RED}❌ Error: No Gemini CLI tool found${NC}"
    echo -e "${YELLOW}💡 Install gemini-cli: npm install -g @google/generative-ai-cli${NC}"
    echo -e "${YELLOW}💡 Or install gem: brew install gemini-cli${NC}"
    exit 1
fi

# Check if prompt file exists
PROMPT_FILE="GEMINI_DEEP_ANALYSIS_PROMPT.md"
if [[ ! -f "$PROMPT_FILE" ]]; then
    echo -e "${RED}❌ Error: $PROMPT_FILE not found${NC}"
    echo -e "${YELLOW}💡 Make sure you're in the DolReal directory${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Analysis prompt file found${NC}\n"

# Create output directory
OUTPUT_DIR="gemini-analysis-output"
mkdir -p "$OUTPUT_DIR"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
OUTPUT_FILE="${OUTPUT_DIR}/analysis_${TIMESTAMP}.md"

echo -e "${BLUE}📊 Starting Gemini 2.5 Pro Ultra analysis...${NC}"
echo -e "${YELLOW}⏰ This may take 5-15 minutes for deep thinking mode${NC}\n"

# Run analysis based on detected CLI tool
if [[ "$CLI_TOOL" == "gemini-cli" ]]; then
    echo -e "${BLUE}🚀 Running: gemini-cli chat --model gemini-2.5-pro-002${NC}\n"
    gemini-cli chat --model gemini-2.5-pro-002 < "$PROMPT_FILE" | tee "$OUTPUT_FILE"
elif [[ "$CLI_TOOL" == "gem" ]]; then
    echo -e "${BLUE}🚀 Running: gem analyze --deep-thinking${NC}\n"
    gem analyze --deep-thinking --context ./src "$(cat $PROMPT_FILE)" | tee "$OUTPUT_FILE"
fi

# Check if output was created
if [[ -f "$OUTPUT_FILE" && -s "$OUTPUT_FILE" ]]; then
    echo -e "\n${GREEN}✅ Analysis complete!${NC}"
    echo -e "${GREEN}📄 Report saved to: $OUTPUT_FILE${NC}\n"

    # Show file size
    FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
    echo -e "${BLUE}📏 Report size: $FILE_SIZE${NC}"

    # Count lines
    LINE_COUNT=$(wc -l < "$OUTPUT_FILE")
    echo -e "${BLUE}📝 Report lines: $LINE_COUNT${NC}\n"

    echo -e "${YELLOW}💡 Next steps:${NC}"
    echo -e "   1. Review the analysis: ${BLUE}cat $OUTPUT_FILE${NC}"
    echo -e "   2. Implement recommended fixes"
    echo -e "   3. Run build: ${BLUE}bun run build${NC}"
    echo -e "   4. Test deployment: ${BLUE}bun run dev${NC}\n"
else
    echo -e "\n${RED}❌ Error: Analysis output file not created or empty${NC}"
    echo -e "${YELLOW}💡 Check your API key and network connection${NC}"
    exit 1
fi

# Optional: Open in default editor
read -p "Open report in default editor? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    ${EDITOR:-open} "$OUTPUT_FILE"
fi

echo -e "\n${GREEN}🎉 Done! Happy optimizing! 🚀${NC}"
