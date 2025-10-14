#!/usr/bin/env bun
/**
 * Gemini API Wrapper for DoL 2025 Multi-Agent Orchestration
 *
 * Usage:
 *   bun run scripts/gem.ts --model <model> --input <file> --output <file>
 *
 * Example:
 *   bun run scripts/gem.ts \
 *     --model gemini-2.5-pro-ultra \
 *     --input prompts/1_gemini_ultra_research.md \
 *     --output artifacts/1_gemini_ultra_research.json
 */

import { writeFile, readFile, mkdir } from 'fs/promises';
import { dirname } from 'path';

interface Args {
  model: string;
  input: string;
  output: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message: string;
    code?: number;
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
    log('Usage: bun run scripts/gem.ts --model <model> --input <file> --output <file>', 'yellow');
    process.exit(1);
  }

  return parsed as Args;
}

async function callGeminiAPI(model: string, prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable not set');
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  log(`\n${COLORS.cyan}→ Calling Gemini API: ${model}${COLORS.reset}`);
  log(`  Prompt length: ${prompt.length} characters`, 'blue');

  const startTime = Date.now();

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        role: 'user',
        parts: [{
          text: prompt,
        }],
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
    }),
  });

  const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);

  if (!response.ok) {
    const errorText = await response.text();
    log(`✗ API Error (${response.status}): ${errorText}`, 'red');
    throw new Error(`Gemini API returned ${response.status}: ${errorText}`);
  }

  const data = await response.json() as GeminiResponse;

  if (data.error) {
    log(`✗ API Error: ${data.error.message}`, 'red');
    throw new Error(`Gemini API error: ${data.error.message}`);
  }

  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('\n') ?? '';

  if (!text) {
    log('✗ No response text generated', 'red');
    throw new Error('Gemini API returned no text');
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
  log('  Gemini API Wrapper v2.0', 'magenta');
  log('═══════════════════════════════════════════════════════', 'magenta');
  log(`\nModel: ${args.model}`, 'cyan');
  log(`Input: ${args.input}`, 'cyan');
  log(`Output: ${args.output}`, 'cyan');

  try {
    // Read input prompt
    log('\n→ Reading input file...', 'yellow');
    const prompt = await readFile(args.input, 'utf-8');
    log(`✓ Read ${prompt.length} characters`, 'green');

    // Call Gemini API
    const responseText = await callGeminiAPI(args.model, prompt);

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
