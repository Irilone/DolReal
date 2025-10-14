# Makefile - DoL 2025 Multi-Agent Orchestration Suite v2.0

.PHONY: all status clean check-env help
.PHONY: gemini-ultra gpt5-codex claude-frontend claude-backend claude-parallel gemini-cli
.PHONY: dirs logs

# Directories
ARTIFACTS_DIR := artifacts
PLANS_DIR := plans
RELEASES_DIR := releases
LOGS_DIR := logs
SCRIPTS_DIR := scripts

# Artifact files
ARTIFACT_1 := $(ARTIFACTS_DIR)/1_gemini_ultra_research.json
ARTIFACT_2 := $(ARTIFACTS_DIR)/2_gpt5_codex_architecture.json
ARTIFACT_3A := $(ARTIFACTS_DIR)/3a_claude_frontend_output.json
ARTIFACT_3B := $(ARTIFACTS_DIR)/3b_claude_backend_output.json
ARTIFACT_4 := $(ARTIFACTS_DIR)/4_gemini_cli_final.json

# Log files
LOG_1 := $(LOGS_DIR)/1_gemini_ultra.log
LOG_2 := $(LOGS_DIR)/2_gpt5_codex.log
LOG_3A := $(LOGS_DIR)/3a_claude_frontend.log
LOG_3B := $(LOGS_DIR)/3b_claude_backend.log
LOG_4 := $(LOGS_DIR)/4_gemini_cli.log

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[0;33m
BLUE := \033[0;34m
MAGENTA := \033[0;35m
CYAN := \033[0;36m
NC := \033[0m # No Color

#############################################
# Main Targets
#############################################

## all: Run complete orchestration pipeline (50-70 minutes)
all: dirs gemini-ultra gpt5-codex claude-parallel gemini-cli
	@echo "$(GREEN)✓ Full orchestration complete!$(NC)"
	@echo "$(CYAN)Release artifacts:$(NC)"
	@ls -lh $(RELEASES_DIR)/*.zip 2>/dev/null || echo "No release found"

## help: Show this help message
help:
	@echo "$(CYAN)DoL 2025 Multi-Agent Orchestration Suite v2.0$(NC)"
	@echo ""
	@echo "$(YELLOW)Main Commands:$(NC)"
	@echo "  make all              - Run full pipeline (50-70 min)"
	@echo "  make status           - Check agent completion status"
	@echo "  make clean            - Remove all artifacts"
	@echo "  make check-env        - Verify environment variables"
	@echo ""
	@echo "$(YELLOW)Individual Agents:$(NC)"
	@echo "  make gemini-ultra     - Agent 1: Research (10-15 min)"
	@echo "  make gpt5-codex       - Agent 2: Architecture (5-10 min)"
	@echo "  make claude-frontend  - Agent 3a: Frontend (15-20 min)"
	@echo "  make claude-backend   - Agent 3b: Backend (15-20 min)"
	@echo "  make claude-parallel  - Both Claudes in parallel (15-20 min)"
	@echo "  make gemini-cli       - Agent 4: Integration (5-10 min)"
	@echo ""
	@echo "$(YELLOW)Utilities:$(NC)"
	@echo "  make dirs             - Create directory structure"
	@echo "  make logs             - View all agent logs"
	@echo "  make help             - Show this message"


#############################################
# Directory Setup
#############################################

## dirs: Create directory structure
dirs:
	@mkdir -p $(ARTIFACTS_DIR)
	@mkdir -p $(PLANS_DIR)
	@mkdir -p $(RELEASES_DIR)
	@mkdir -p $(LOGS_DIR)
	@mkdir -p $(SCRIPTS_DIR)
	@echo "$(GREEN)✓ Directories created$(NC)"

#############################################
# Agent Execution
#############################################

## gemini-ultra: Run Agent 1 - Gemini 2.5 Pro Ultra (Research & Planning)
gemini-ultra: dirs
	@test -n "$$GEMINI_API_KEY" || (echo "$(RED)✗ GEMINI_API_KEY not set$(NC)" && exit 1)
	@echo "$(MAGENTA)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(MAGENTA)  Agent 1: Gemini 2.5 Pro Ultra$(NC)"
	@echo "$(MAGENTA)  Research & Planning (~10-15 min)$(NC)"
	@echo "$(MAGENTA)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@bun run $(SCRIPTS_DIR)/gem.ts \
		--model gemini-2.5-pro-ultra \
		--input prompts/1_gemini_ultra_research.md \
		--output $(ARTIFACT_1) \
		2>&1 | tee $(LOG_1)
	@echo "$(GREEN)✓ Agent 1 complete: $(ARTIFACT_1)$(NC)"

## gpt5-codex: Run Agent 2 - GPT-5 Codex (System Architecture)
gpt5-codex: dirs $(ARTIFACT_1)
	@test -n "$$OPENAI_API_KEY" || (echo "$(RED)✗ OPENAI_API_KEY not set$(NC)" && exit 1)
	@echo "$(MAGENTA)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(MAGENTA)  Agent 2: GPT-5 Codex$(NC)"
	@echo "$(MAGENTA)  System Architecture (~5-10 min)$(NC)"
	@echo "$(MAGENTA)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@cat prompts/2_gpt5_codex_architecture.md $(ARTIFACT_1) > /tmp/gpt5-input.md
	@bun run $(SCRIPTS_DIR)/openai.ts \
		--model gpt-5-codex \
		--input /tmp/gpt5-input.md \
		--output $(ARTIFACT_2) \
		2>&1 | tee $(LOG_2)
	@echo "$(GREEN)✓ Agent 2 complete: $(ARTIFACT_2)$(NC)"

## claude-frontend: Run Agent 3a - Claude Sonnet 4.5 #1 (Frontend)
claude-frontend: dirs $(ARTIFACT_1) $(ARTIFACT_2)
	@test -n "$$ANTHROPIC_API_KEY" || (echo "$(RED)✗ ANTHROPIC_API_KEY not set$(NC)" && exit 1)
	@echo "$(MAGENTA)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(MAGENTA)  Agent 3a: Claude Sonnet 4.5 #1$(NC)"
	@echo "$(MAGENTA)  Frontend Implementation (~15-20 min)$(NC)"
	@echo "$(MAGENTA)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@cat prompts/3a_claude_frontend.md $(ARTIFACT_1) $(ARTIFACT_2) > /tmp/claude-frontend-input.md
	@bun run $(SCRIPTS_DIR)/anthropic.ts \
		--model claude-sonnet-4-5 \
		--input /tmp/claude-frontend-input.md \
		--output $(ARTIFACT_3A) \
		2>&1 | tee $(LOG_3A)
	@echo "$(GREEN)✓ Agent 3a complete: $(ARTIFACT_3A)$(NC)"

## claude-backend: Run Agent 3b - Claude Sonnet 4.5 #2 (Backend)
claude-backend: dirs $(ARTIFACT_1) $(ARTIFACT_2)
	@test -n "$$ANTHROPIC_API_KEY" || (echo "$(RED)✗ ANTHROPIC_API_KEY not set$(NC)" && exit 1)
	@echo "$(MAGENTA)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(MAGENTA)  Agent 3b: Claude Sonnet 4.5 #2$(NC)"
	@echo "$(MAGENTA)  Backend & Documentation (~15-20 min)$(NC)"
	@echo "$(MAGENTA)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@cat prompts/3b_claude_backend.md $(ARTIFACT_1) $(ARTIFACT_2) > /tmp/claude-backend-input.md
	@bun run $(SCRIPTS_DIR)/anthropic.ts \
		--model claude-sonnet-4-5 \
		--input /tmp/claude-backend-input.md \
		--output $(ARTIFACT_3B) \
		2>&1 | tee $(LOG_3B)
	@echo "$(GREEN)✓ Agent 3b complete: $(ARTIFACT_3B)$(NC)"

## claude-parallel: Run both Claude agents in parallel
claude-parallel: dirs $(ARTIFACT_1) $(ARTIFACT_2)
	@test -n "$$ANTHROPIC_API_KEY" || (echo "$(RED)✗ ANTHROPIC_API_KEY not set$(NC)" && exit 1)
	@echo "$(MAGENTA)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(MAGENTA)  Running Claude agents in parallel...$(NC)"
	@echo "$(MAGENTA)  Agent 3a & 3b (~15-20 min)$(NC)"
	@echo "$(MAGENTA)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@cat prompts/3a_claude_frontend.md $(ARTIFACT_1) $(ARTIFACT_2) > /tmp/claude-frontend-input.md
	@cat prompts/3b_claude_backend.md $(ARTIFACT_1) $(ARTIFACT_2) > /tmp/claude-backend-input.md
	@( \
		bun run $(SCRIPTS_DIR)/anthropic.ts \
			--model claude-sonnet-4-5 \
			--input /tmp/claude-frontend-input.md \
			--output $(ARTIFACT_3A) \
			2>&1 | tee $(LOG_3A) & \
		bun run $(SCRIPTS_DIR)/anthropic.ts \
			--model claude-sonnet-4-5 \
			--input /tmp/claude-backend-input.md \
			--output $(ARTIFACT_3B) \
			2>&1 | tee $(LOG_3B) & \
		wait \
	)
	@echo "$(GREEN)✓ Both Claude agents complete$(NC)"

## gemini-cli: Run Agent 4 - Gemini 2.5 Pro CLI (Final Integration)
gemini-cli: $(ARTIFACT_3A) $(ARTIFACT_3B)
	@test -n "$$GEMINI_API_KEY" || (echo "$(RED)✗ GEMINI_API_KEY not set$(NC)" && exit 1)
	@echo "$(MAGENTA)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(MAGENTA)  Agent 4: Gemini 2.5 Pro CLI$(NC)"
	@echo "$(MAGENTA)  Final Integration (~5-10 min)$(NC)"
	@echo "$(MAGENTA)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@cat prompts/4_gemini_cli_final.md $(ARTIFACT_3A) $(ARTIFACT_3B) > /tmp/gemini-cli-input.md
	@bun run $(SCRIPTS_DIR)/gem.ts \
		--model gemini-2.5-pro \
		--input /tmp/gemini-cli-input.md \
		--output $(ARTIFACT_4) \
		2>&1 | tee $(LOG_4)
	@echo "$(GREEN)✓ Agent 4 complete: $(ARTIFACT_4)$(NC)"

#############################################
# Status & Monitoring
#############################################

## status: Check completion status of all agents
status:
	@echo "$(CYAN)Agent Completion Status:$(NC)"
	@echo ""
	@test -f $(ARTIFACT_1) && echo "$(GREEN)✓$(NC) gemini-ultra     ($(ARTIFACT_1))" || echo "$(RED)✗$(NC) gemini-ultra     (pending)"
	@test -f $(ARTIFACT_2) && echo "$(GREEN)✓$(NC) gpt5-codex       ($(ARTIFACT_2))" || echo "$(RED)✗$(NC) gpt5-codex       (pending)"
	@test -f $(ARTIFACT_3A) && echo "$(GREEN)✓$(NC) claude-frontend  ($(ARTIFACT_3A))" || echo "$(RED)✗$(NC) claude-frontend  (pending)"
	@test -f $(ARTIFACT_3B) && echo "$(GREEN)✓$(NC) claude-backend   ($(ARTIFACT_3B))" || echo "$(RED)✗$(NC) claude-backend   (pending)"
	@test -f $(ARTIFACT_4) && echo "$(GREEN)✓$(NC) gemini-cli       ($(ARTIFACT_4))" || echo "$(RED)✗$(NC) gemini-cli       (pending)"
	@echo ""
	@echo "$(CYAN)Plans Generated:$(NC)"
	@ls -1 $(PLANS_DIR)/*.md 2>/dev/null | wc -l | xargs -I {} echo "  {} plan files"
	@echo ""
	@echo "$(CYAN)Releases:$(NC)"
	@ls -lh $(RELEASES_DIR)/*.zip 2>/dev/null || echo "  No releases yet"

## logs: View all agent logs
logs:
	@echo "$(CYAN)Agent Logs:$(NC)"
	@echo ""
	@for log in $(LOG_1) $(LOG_2) $(LOG_3A) $(LOG_3B) $(LOG_4); do \
		if [ -f $$log ]; then \
			echo "$(YELLOW)━━━ $$log ━━━$(NC)"; \
			tail -n 20 $$log; \
			echo ""; \
		fi \
	done

#############################################
# Cleanup
#############################################

## clean: Remove all generated artifacts
clean:
	@echo "$(YELLOW)Cleaning artifacts...$(NC)"
	@rm -rf $(ARTIFACTS_DIR)/*
	@rm -rf $(PLANS_DIR)/*
	@rm -rf $(RELEASES_DIR)/*
	@rm -rf $(LOGS_DIR)/*
	@rm -f /tmp/gemini-*-input.md /tmp/gpt5-input.md /tmp/claude-*-input.md
	@echo "$(GREEN)✓ All artifacts cleaned$(NC)"

#############################################
# CI/CD Integration
#############################################

## ci: Run orchestration in CI environment
ci: check-env all
	@echo "$(GREEN)✓ CI pipeline complete$(NC)"
	@echo "$(CYAN)Artifacts for upload:$(NC)"
	@find $(ARTIFACTS_DIR) $(PLANS_DIR) $(RELEASES_DIR) -type f

#############################################
# Development Utilities
#############################################

## validate-schema: Validate all artifacts against JSON schema
validate-schema:
	@echo "$(BLUE)Validating artifacts against schema...$(NC)"
	@for artifact in $(ARTIFACT_1) $(ARTIFACT_2) $(ARTIFACT_3A) $(ARTIFACT_3B) $(ARTIFACT_4); do \
		if [ -f $$artifact ]; then \
			echo "Validating $$artifact..."; \
			bun run scripts/validate-schema.ts $$artifact schemas/agent-handoff-schema.json || exit 1; \
		fi \
	done
	@echo "$(GREEN)✓ All artifacts valid$(NC)"

## test: Run orchestration test suite
test:
	@echo "$(BLUE)Running orchestration tests...$(NC)"
	@bun test scripts/__tests__/*.test.ts

.DEFAULT_GOAL := help
