#!/usr/bin/env bun
/**
 * Anthropic API Wrapper for DoL 2025 Multi-Agent Orchestration
 *
 * Usage:
 *   bun run scripts/anthropic.ts --model <model> --input <file> --output <file>
 *
 * Example:
 *   bun run scripts/anthropic.ts \
 *     --model claude-sonnet-4-5 \
 *     --input /tmp/claude-frontend-input.md \
 *     --output artifacts/3a_claude_frontend_output.json
 */

import { writeFile, readFile, mkdir } from 'fs/promises';
import { dirname } from 'path';

interface Args {
  model: string;
  input: string;
  output: string;
}

interface AnthropicResponse {
  content?: Array<{
    text?: string;
  }>;
  error?: {
    message: string;
    type?: string;
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
    log('Usage: bun run scripts/anthropic.ts --model <model> --input <file> --output <file>', 'yellow');
    process.exit(1);
  }

  return parsed as Args;
}

function mapModelName(model: string): string {
  const modelMap: Record<string, string> = {
    'claude-sonnet-4-5': 'claude-sonnet-4-20250514',
    'claude-opus-4': 'claude-opus-4-20250514',
    'claude-3-5-sonnet': 'claude-3-5-sonnet-20241022',
  };

  return modelMap[model] || model;
}

async function callAnthropicAPI(model: string, prompt: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable not set');
  }

  const apiModel = mapModelName(model);
  const apiUrl = 'https://api.anthropic.com/v1/messages';

  log(`\n${COLORS.cyan}→ Calling Anthropic API: ${apiModel}${COLORS.reset}`);
  log(`  Prompt length: ${prompt.length} characters`, 'blue');

  const startTime = Date.now();

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: apiModel,
      max_tokens: 8192,
      temperature: 0.7,
      messages: [{
        role: 'user',
        content: prompt,
      }],
    }),
  });

  const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);

  if (!response.ok) {
    const errorText = await response.text();
    log(`✗ API Error (${response.status}): ${errorText}`, 'red');
    throw new Error(`Anthropic API returned ${response.status}: ${errorText}`);
  }

  const data = await response.json() as AnthropicResponse;

  if (data.error) {
    log(`✗ API Error: ${data.error.message}`, 'red');
    throw new Error(`Anthropic API error: ${data.error.message}`);
  }

  const text = data.content?.map((c) => c.text).join('\n') ?? '';

  if (!text) {
    log('✗ No response text generated', 'red');
    throw new Error('Anthropic API returned no text');
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
  log('  Anthropic API Wrapper v2.0', 'magenta');
  log('═══════════════════════════════════════════════════════', 'magenta');
  log(`\nModel: ${args.model}`, 'cyan');
  log(`Input: ${args.input}`, 'cyan');
  log(`Output: ${args.output}`, 'cyan');

  try {
    // Read input prompt
    log('\n→ Reading input file...', 'yellow');
    const prompt = await readFile(args.input, 'utf-8');
    log(`✓ Read ${prompt.length} characters`, 'green');

    // Call Anthropic API
    const responseText = await callAnthropicAPI(args.model, prompt);

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
