#!/usr/bin/env bun
/**
 * Single Agent Runner
 * Execute individual agents from the orchestration pipeline
 */

import fs from 'fs/promises';
import path from 'path';

const AGENTS = {
  'gemini-ultra': {
    name: 'Gemini 2.5 Pro Ultra (Research)',
    promptFile: 'prompts/1_gemini_ultra_research.md',
    outputFile: 'artifacts/1_gemini_ultra_research.json',
    envKey: 'GEMINI_API_KEY',
    model: 'gemini-2.5-pro-ultra',
  },
  'gpt5-codex': {
    name: 'GPT-5 Codex (Architecture)',
    promptFile: 'prompts/2_gpt5_codex_architecture.md',
    outputFile: 'artifacts/2_gpt5_codex_architecture.json',
    envKey: 'OPENAI_API_KEY',
    model: 'gpt-5-codex-high-reasoning',
  },
  'claude-frontend': {
    name: 'Claude Sonnet 4.5 #1 (Frontend)',
    promptFile: 'prompts/3a_claude_frontend.md',
    outputFile: 'artifacts/3a_claude_frontend_output.json',
    envKey: 'ANTHROPIC_API_KEY',
    model: 'claude-sonnet-4.5',
  },
  'claude-backend': {
    name: 'Claude Sonnet 4.5 #2 (Backend)',
    promptFile: 'prompts/3b_claude_backend.md',
    outputFile: 'artifacts/3b_claude_backend_output.json',
    envKey: 'ANTHROPIC_API_KEY',
    model: 'claude-sonnet-4.5',
  },
  'gemini-cli': {
    name: 'Gemini 2.5 Pro CLI (Integration)',
    promptFile: 'prompts/4_gemini_cli_final.md',
    outputFile: 'artifacts/4_gemini_cli_final.json',
    envKey: 'GEMINI_API_KEY',
    model: 'gemini-2.5-pro',
  },
};

/**
 * Extract JSON from markdown code blocks or plain text
 */
function extractJSON(text: string): unknown {
  // Try to find JSON in markdown code blocks
  const jsonBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonBlockMatch) {
    try {
      return JSON.parse(jsonBlockMatch[1]);
    } catch (e) {
      console.log(`Failed to parse JSON from code block: ${e}`);
    }
  }

  // Try to find any code block
  const codeBlockMatch = text.match(/```\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1]);
    } catch (e) {
      console.log(`Failed to parse JSON from generic code block: ${e}`);
    }
  }

  // Try to parse the entire text as JSON
  try {
    return JSON.parse(text);
  } catch (e) {
    // If all else fails, return the raw text
    console.log(`Warning: Could not parse JSON from response. Saving raw output.`);
    return {
      raw_output: text,
      parse_error: true,
      error_message: `Failed to extract JSON: ${e}`,
    };
  }
}

async function runAgent(agentId: keyof typeof AGENTS) {
  const agent = AGENTS[agentId];
  if (!agent) {
    console.error(`Unknown agent: ${agentId}`);
    console.error(`Available agents: ${Object.keys(AGENTS).join(', ')}`);
    process.exit(1);
  }

  console.log(`\n🤖 Running ${agent.name}...\n`);

  // Check API key
  const apiKey = process.env[agent.envKey];
  if (!apiKey) {
    console.error(`❌ ${agent.envKey} not set`);
    process.exit(1);
  }

  // Ensure directories exist
  await fs.mkdir('artifacts', { recursive: true });
  await fs.mkdir('plans', { recursive: true });

  // Load prompt
  const promptContent = await fs.readFile(agent.promptFile, 'utf-8');

  console.log(`📄 Prompt loaded: ${agent.promptFile}`);
  console.log(`   ${promptContent.split('\n')[0].substring(0, 100)}...`);
  console.log(`🎯 Model: ${agent.model}`);
  console.log(`📊 Output: ${agent.outputFile}\n`);

  console.log('⏳ Executing agent (this may take several minutes)...\n');

  const startTime = Date.now();

  try {
    // Execute agent based on type
    let output: string;
    if (agentId.startsWith('gemini')) {
      output = await executeGemini(promptContent, agent.model, apiKey);
    } else if (agentId.startsWith('gpt')) {
      output = await executeOpenAI(promptContent, agent.model, apiKey);
    } else if (agentId.startsWith('claude')) {
      output = await executeClaude(promptContent, agent.model, apiKey);
    } else {
      throw new Error('Unknown agent type');
    }

    console.log(`\n📝 Received ${output.length} characters from API`);

    // Try to extract and validate JSON
    const parsedOutput = extractJSON(output);

    // Save parsed output as JSON
    await fs.writeFile(agent.outputFile, JSON.stringify(parsedOutput, null, 2), 'utf-8');

    const duration = Date.now() - startTime;
    console.log(`\n✅ ${agent.name} completed in ${(duration / 1000).toFixed(1)}s`);
    console.log(`📊 Output saved to: ${agent.outputFile}`);

    // Show preview
    const preview = JSON.stringify(parsedOutput).substring(0, 200);
    console.log(`   Preview: ${preview}...\n`);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`\n❌ ${agent.name} failed after ${(duration / 1000).toFixed(1)}s`);
    console.error(`Error: ${error}\n`);
    process.exit(1);
  }
}

async function executeGemini(
  prompt: string,
  model: string,
  apiKey: string
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  console.log(`   Calling Gemini API (${model})...`);

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

  if (data.error) {
    throw new Error(`Gemini API error: ${JSON.stringify(data.error)}`);
  }

  const text = data.candidates?.[0]?.content?.parts?.map((p: { text: string }) => p.text).join('\n') ?? '';

  if (!text) {
    throw new Error('Gemini API returned empty response');
  }

  return text;
}

async function executeOpenAI(
  prompt: string,
  model: string,
  apiKey: string
): Promise<string> {
  console.log(`   Calling OpenAI API (${model})...`);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
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

  if (data.error) {
    throw new Error(`OpenAI API error: ${JSON.stringify(data.error)}`);
  }

  const text = data.choices?.[0]?.message?.content ?? '';

  if (!text) {
    throw new Error('OpenAI API returned empty response');
  }

  return text;
}

async function executeClaude(
  prompt: string,
  model: string,
  apiKey: string
): Promise<string> {
  console.log(`   Calling Claude API (${model})...`);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
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

  if (data.error) {
    throw new Error(`Claude API error: ${JSON.stringify(data.error)}`);
  }

  const text = data.content?.[0]?.text ?? '';

  if (!text) {
    throw new Error('Claude API returned empty response');
  }

  return text;
}

// CLI
const agentId = process.argv[2];
if (!agentId) {
  console.error('Usage: bun run scripts/run-agent.ts <agent-id>');
  console.error(`Available agents: ${Object.keys(AGENTS).join(', ')}`);
  process.exit(1);
}

runAgent(agentId as keyof typeof AGENTS);
