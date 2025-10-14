#!/usr/bin/env bun
/**
 * Multi-Agent Orchestrator for DoL 2025
 * Coordinates GPT-5 Codex, Gemini 2.5 Pro Ultra, and 2x Claude Sonnet 4.5
 * File-based async communication via JSON artifacts
 */

import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';

// ============================================================================
// Configuration
// ============================================================================

interface AgentConfig {
  id: string;
  name: string;
  command: string;
  inputArtifacts: string[];
  outputArtifact: string;
  promptFile: string;
  canRunInParallel: boolean;
  parallelGroup?: number;
}

const AGENTS: AgentConfig[] = [
  {
    id: 'gemini-ultra',
    name: 'Gemini 2.5 Pro Ultra (Research)',
    command: 'gemini',
    inputArtifacts: [],
    outputArtifact: 'artifacts/1_gemini_ultra_research.json',
    promptFile: 'prompts/1_gemini_ultra_research.md',
    canRunInParallel: false,
  },
  {
    id: 'gpt5-codex',
    name: 'GPT-5 Codex (Architecture)',
    command: 'openai',
    inputArtifacts: ['artifacts/1_gemini_ultra_research.json'],
    outputArtifact: 'artifacts/2_gpt5_codex_architecture.json',
    promptFile: 'prompts/2_gpt5_codex_architecture.md',
    canRunInParallel: false,
  },
  {
    id: 'claude-frontend',
    name: 'Claude Sonnet 4.5 #1 (Frontend)',
    command: 'claude',
    inputArtifacts: [
      'artifacts/1_gemini_ultra_research.json',
      'artifacts/2_gpt5_codex_architecture.json',
    ],
    outputArtifact: 'artifacts/3a_claude_frontend_output.json',
    promptFile: 'prompts/3a_claude_frontend.md',
    canRunInParallel: true,
    parallelGroup: 1,
  },
  {
    id: 'claude-backend',
    name: 'Claude Sonnet 4.5 #2 (Backend)',
    command: 'claude',
    inputArtifacts: [
      'artifacts/1_gemini_ultra_research.json',
      'artifacts/2_gpt5_codex_architecture.json',
    ],
    outputArtifact: 'artifacts/3b_claude_backend_output.json',
    promptFile: 'prompts/3b_claude_backend.md',
    canRunInParallel: true,
    parallelGroup: 1,
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI (Final Integration)',
    command: 'gemini',
    inputArtifacts: [
      'artifacts/3a_claude_frontend_output.json',
      'artifacts/3b_claude_backend_output.json',
    ],
    outputArtifact: 'artifacts/4_gemini_cli_final.json',
    promptFile: 'prompts/4_gemini_cli_final.md',
    canRunInParallel: false,
  },
];

// ============================================================================
// Utility Functions
// ============================================================================

async function ensureDirectories() {
  await fs.mkdir('artifacts', { recursive: true });
  await fs.mkdir('prompts', { recursive: true });
  await fs.mkdir('logs', { recursive: true });
}

async function checkArtifactsExist(artifacts: string[]): Promise<boolean> {
  for (const artifact of artifacts) {
    try {
      await fs.access(artifact);
    } catch {
      return false;
    }
  }
  return true;
}

async function loadArtifact(filePath: string): Promise<any> {
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

async function saveArtifact(filePath: string, data: any): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function log(message: string) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

/**
 * Extract JSON from markdown code blocks or plain text
 */
function extractJSON(text: string): any {
  // Try to find JSON in markdown code blocks
  const jsonBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonBlockMatch) {
    try {
      return JSON.parse(jsonBlockMatch[1]);
    } catch (e) {
      log(`Failed to parse JSON from code block: ${e}`);
    }
  }

  // Try to find any code block
  const codeBlockMatch = text.match(/```\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1]);
    } catch (e) {
      log(`Failed to parse JSON from generic code block: ${e}`);
    }
  }

  // Try to parse the entire text as JSON
  try {
    return JSON.parse(text);
  } catch (e) {
    // If all else fails, return a structured error
    log(`Warning: Could not parse JSON from response. Returning raw text.`);
    return {
      raw_output: text,
      parse_error: true,
      error_message: `Failed to extract JSON: ${e}`,
    };
  }
}

// ============================================================================
// Agent Execution
// ============================================================================

async function executeAgent(agent: AgentConfig): Promise<void> {
  log(`Starting ${agent.name}...`);
  const startTime = Date.now();

  try {
    // Check if input artifacts exist
    if (agent.inputArtifacts.length > 0) {
      const allExist = await checkArtifactsExist(agent.inputArtifacts);
      if (!allExist) {
        throw new Error(
          `Missing input artifacts for ${agent.id}: ${agent.inputArtifacts.join(', ')}`
        );
      }
    }

    // Load prompt
    const promptContent = await fs.readFile(agent.promptFile, 'utf-8');

    // Load input artifacts and inject into prompt
    let fullPrompt = promptContent;
    for (const artifactPath of agent.inputArtifacts) {
      const artifact = await loadArtifact(artifactPath);
      fullPrompt += `\n\n## Input from ${path.basename(artifactPath)}\n\`\`\`json\n${JSON.stringify(artifact, null, 2)}\n\`\`\`\n`;
    }

    // Execute agent-specific command
    let output: string;
    switch (agent.command) {
      case 'gemini':
        output = await executeGemini(fullPrompt, agent.id);
        break;
      case 'openai':
        output = await executeOpenAI(fullPrompt, agent.id);
        break;
      case 'claude':
        output = await executeClaude(fullPrompt, agent.id);
        break;
      default:
        throw new Error(`Unknown command: ${agent.command}`);
    }

    // Parse and save output
    const outputData = extractJSON(output);

    // Ensure metadata exists
    if (!outputData.metadata) {
      outputData.metadata = {};
    }

    // Add orchestrator metadata
    outputData.metadata = {
      ...outputData.metadata,
      agent_id: agent.id,
      timestamp: new Date().toISOString(),
      execution_time_ms: Date.now() - startTime,
      status: 'completed',
    };

    await saveArtifact(agent.outputArtifact, outputData);

    // Log snippet of output for debugging
    const outputPreview = JSON.stringify(outputData).substring(0, 200);
    log(`✓ ${agent.name} completed in ${Date.now() - startTime}ms`);
    log(`  Output preview: ${outputPreview}...`);
  } catch (error) {
    log(`✗ ${agent.name} failed: ${error}`);
    throw error;
  }
}

// ============================================================================
// Provider-Specific Executors
// ============================================================================

async function executeGemini(prompt: string, agentId: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set');

  const model =
    agentId === 'gemini-ultra' ? 'gemini-2.5-pro-ultra' : 'gemini-2.5-pro';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  log(`  Calling Gemini API (${model})...`);

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 32000,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  // Check for API errors
  if (data.error) {
    throw new Error(`Gemini API error: ${JSON.stringify(data.error)}`);
  }

  const text = data.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('\n') ?? '';

  if (!text) {
    throw new Error('Gemini API returned empty response');
  }

  log(`  Received ${text.length} characters from Gemini`);
  return text;
}

async function executeOpenAI(prompt: string, agentId: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');

  log(`  Calling OpenAI API (gpt-5-codex-high-reasoning)...`);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-5-codex-high-reasoning',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert system architect specializing in TypeScript, React, Next.js, and modern web development.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 16000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  // Check for API errors
  if (data.error) {
    throw new Error(`OpenAI API error: ${JSON.stringify(data.error)}`);
  }

  const text = data.choices?.[0]?.message?.content ?? '';

  if (!text) {
    throw new Error('OpenAI API returned empty response');
  }

  log(`  Received ${text.length} characters from OpenAI`);
  return text;
}

async function executeClaude(prompt: string, agentId: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

  log(`  Calling Claude API (claude-sonnet-4.5)...`);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4.5',
      max_tokens: 32000,
      temperature: 0.2,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  // Check for API errors
  if (data.error) {
    throw new Error(`Claude API error: ${JSON.stringify(data.error)}`);
  }

  const text = data.content?.[0]?.text ?? '';

  if (!text) {
    throw new Error('Claude API returned empty response');
  }

  log(`  Received ${text.length} characters from Claude`);
  return text;
}

// ============================================================================
// Parallel Execution
// ============================================================================

async function executeParallelGroup(agents: AgentConfig[]): Promise<void> {
  log(`Executing ${agents.length} agents in parallel...`);
  await Promise.all(agents.map((agent) => executeAgent(agent)));
}

// ============================================================================
// Main Orchestration
// ============================================================================

async function orchestrate() {
  log('DoL 2025 Multi-Agent Orchestrator starting...');
  await ensureDirectories();

  const sequentialAgents = AGENTS.filter((a) => !a.canRunInParallel);
  const parallelAgents = AGENTS.filter((a) => a.canRunInParallel);

  // Group parallel agents by parallelGroup
  const parallelGroups = new Map<number, AgentConfig[]>();
  for (const agent of parallelAgents) {
    const group = agent.parallelGroup ?? 0;
    if (!parallelGroups.has(group)) {
      parallelGroups.set(group, []);
    }
    parallelGroups.get(group)!.push(agent);
  }

  try {
    // Execute sequential agents in order
    for (const agent of sequentialAgents) {
      // Check if this agent comes before parallel group
      const nextParallelGroup = Math.min(...Array.from(parallelGroups.keys()));
      const currentIndex = AGENTS.indexOf(agent);

      // If there's a parallel group between this and next sequential, run it
      if (parallelGroups.size > 0) {
        const nextSequentialIndex = sequentialAgents.indexOf(agent) + 1;
        if (
          nextSequentialIndex < sequentialAgents.length &&
          AGENTS.indexOf(sequentialAgents[nextSequentialIndex]) >
            AGENTS.indexOf(parallelAgents[0])
        ) {
          await executeAgent(agent);
          // Run parallel group
          const group = parallelGroups.get(nextParallelGroup);
          if (group) {
            await executeParallelGroup(group);
            parallelGroups.delete(nextParallelGroup);
          }
          continue;
        }
      }

      await executeAgent(agent);
    }

    log('✓ All agents completed successfully!');
    log(`Final build artifact: ${AGENTS[AGENTS.length - 1].outputArtifact}`);
  } catch (error) {
    log(`✗ Orchestration failed: ${error}`);
    process.exit(1);
  }
}

// ============================================================================
// CLI
// ============================================================================

const command = process.argv[2];

switch (command) {
  case 'run':
    orchestrate();
    break;
  case 'status':
    (async () => {
      for (const agent of AGENTS) {
        const exists = await checkArtifactsExist([agent.outputArtifact]);
        console.log(
          `${agent.id}: ${exists ? '✓ Complete' : '✗ Pending'} (${agent.outputArtifact})`
        );
      }
    })();
    break;
  case 'clean':
    (async () => {
      await fs.rm('artifacts', { recursive: true, force: true });
      log('Artifacts cleaned');
    })();
    break;
  default:
    console.log(`
DoL 2025 Multi-Agent Orchestrator

Commands:
  run     - Execute full orchestration pipeline
  status  - Check completion status of all agents
  clean   - Remove all artifacts

Environment variables required:
  GEMINI_API_KEY     - For Gemini 2.5 Pro Ultra/CLI
  OPENAI_API_KEY     - For GPT-5 Codex
  ANTHROPIC_API_KEY  - For Claude Sonnet 4.5 (both instances)
    `);
}
