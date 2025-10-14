#!/usr/bin/env bun
/**
 * OpenAI API Wrapper for DoL 2025 Multi-Agent Orchestration
 *
 * Usage:
 *   bun run scripts/openai.ts --model <model> --input <file> --output <file>
 *
 * Example:
 *   bun run scripts/openai.ts \
 *     --model gpt-5-codex \
 *     --input /tmp/gpt5-input.md \
 *     --output artifacts/2_gpt5_codex_architecture.json
 */

import { writeFile, readFile, mkdir } from 'fs/promises';
import { dirname } from 'path';

interface Args {
  model: string;
  input: string;
  output: string;
}

interface OpenAIResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message: string;
    type?: string;
    code?: string;
  };
}

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof COLORS = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function parseArgs(): Args {
  const args = process.argv.slice(2);
  const parsed: Partial<Args> = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '') as keyof Args;
    const value = args[i + 1];
    parsed[key] = value;
  }

  if (!parsed.model || !parsed.input || !parsed.output) {
    log('Error: Missing required arguments', 'red');
    log('Usage: bun run scripts/openai.ts --model <model> --input <file> --output <file>', 'yellow');
    process.exit(1);
  }

  return parsed as Args;
}

function mapModelName(model: string): string {
  const modelMap: Record<string, string> = {
    'gpt-5-codex': 'gpt-4-turbo', // Fallback to GPT-4 Turbo until GPT-5 is available
    'gpt-5': 'gpt-4-turbo',
    'gpt-4-turbo': 'gpt-4-turbo-preview',
  };

  return modelMap[model] || model;
}

async function callOpenAIAPI(model: string, prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable not set');
  }

  const apiModel = mapModelName(model);
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  log(`\n${COLORS.cyan}→ Calling OpenAI API: ${apiModel}${COLORS.reset}`);
  log(`  Prompt length: ${prompt.length} characters`, 'blue');

  const startTime = Date.now();

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: apiModel,
      messages: [{
        role: 'user',
        content: prompt,
      }],
      temperature: 0.7,
      max_tokens: 8192,
      top_p: 0.95,
    }),
  });

  const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);

  if (!response.ok) {
    const errorText = await response.text();
    log(`✗ API Error (${response.status}): ${errorText}`, 'red');
    throw new Error(`OpenAI API returned ${response.status}: ${errorText}`);
  }

  const data = await response.json() as OpenAIResponse;

  if (data.error) {
    log(`✗ API Error: ${data.error.message}`, 'red');
    throw new Error(`OpenAI API error: ${data.error.message}`);
  }

  const text = data.choices?.[0]?.message?.content ?? '';

  if (!text) {
    log('✗ No response text generated', 'red');
    throw new Error('OpenAI API returned no text');
  }

  log(`${COLORS.green}✓ API call successful${COLORS.reset}`);
  log(`  Response length: ${text.length} characters`, 'blue');
  log(`  Elapsed time: ${elapsedTime}s`, 'blue');

  return text;
}

async function main() {
  const args = parseArgs();
  const overallStart = Date.now();

  log('═══════════════════════════════════════════════════════', 'magenta');
  log('  OpenAI API Wrapper v2.0', 'magenta');
  log('═══════════════════════════════════════════════════════', 'magenta');
  log(`\nModel: ${args.model}`, 'cyan');
  log(`Input: ${args.input}`, 'cyan');
  log(`Output: ${args.output}`, 'cyan');

  try {
    // Read input prompt
    log('\n→ Reading input file...', 'yellow');
    const prompt = await readFile(args.input, 'utf-8');
    log(`✓ Read ${prompt.length} characters`, 'green');

    // Call OpenAI API
    const responseText = await callOpenAIAPI(args.model, prompt);

    // Ensure output directory exists
    const outputDir = dirname(args.output);
    await mkdir(outputDir, { recursive: true });

    // Write output
    log('\n→ Writing output file...', 'yellow');
    await writeFile(args.output, responseText, 'utf-8');
    log(`✓ Wrote ${responseText.length} characters to ${args.output}`, 'green');

    const overallElapsed = ((Date.now() - overallStart) / 1000).toFixed(2);
    log(`\n${COLORS.green}✓ Complete in ${overallElapsed}s${COLORS.reset}`);
    log('═══════════════════════════════════════════════════════\n', 'magenta');

    process.exit(0);
  } catch (error) {
    log(`\n${COLORS.red}✗ Error: ${error instanceof Error ? error.message : String(error)}${COLORS.reset}`);
    log('═══════════════════════════════════════════════════════\n', 'magenta');
    process.exit(1);
  }
}

main();
