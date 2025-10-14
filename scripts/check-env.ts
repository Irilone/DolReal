#!/usr/bin/env bun
/**
 * Environment Variables Checker
 * Validates all required API keys before orchestration
 */

interface EnvCheck {
  name: string;
  required: boolean;
  description: string;
}

const requiredEnvVars: EnvCheck[] = [
  {
    name: 'GEMINI_API_KEY',
    required: true,
    description: 'Gemini 2.5 Pro Ultra & CLI (Agents 1 & 4)',
  },
  {
    name: 'OPENAI_API_KEY',
    required: true,
    description: 'GPT-5 Codex (Agent 2)',
  },
  {
    name: 'ANTHROPIC_API_KEY',
    required: true,
    description: 'Claude Sonnet 4.5 x2 (Agents 3a & 3b)',
  },
];

const optionalEnvVars: EnvCheck[] = [
  {
    name: 'NEXT_PUBLIC_YOUTUBE_API_KEY',
    required: false,
    description: 'YouTube Data API (for final build)',
  },
  {
    name: 'INFRANODUS_API_KEY',
    required: false,
    description: 'InfraNodus integration (for final build)',
  },
];

function checkEnv() {
  console.log('🔍 Checking environment variables...\n');

  let allRequired = true;

  console.log('Required for Orchestration:');
  for (const env of requiredEnvVars) {
    const value = process.env[env.name];
    const status = value ? '✅' : '❌';
    const maskedValue = value ? `${value.slice(0, 8)}...` : 'NOT SET';

    console.log(`  ${status} ${env.name}`);
    console.log(`     ${env.description}`);
    console.log(`     Value: ${maskedValue}\n`);

    if (!value) allRequired = false;
  }

  console.log('Optional (for final build):');
  for (const env of optionalEnvVars) {
    const value = process.env[env.name];
    const status = value ? '✅' : '⚠️ ';
    const maskedValue = value ? `${value.slice(0, 8)}...` : 'NOT SET';

    console.log(`  ${status} ${env.name}`);
    console.log(`     ${env.description}`);
    console.log(`     Value: ${maskedValue}\n`);
  }

  if (!allRequired) {
    console.error('❌ Missing required environment variables!\n');
    console.error('Set them in your shell or .env file:');
    console.error('  export GEMINI_API_KEY="your-key"');
    console.error('  export OPENAI_API_KEY="your-key"');
    console.error('  export ANTHROPIC_API_KEY="your-key"\n');
    process.exit(1);
  }

  console.log('✅ All required environment variables are set!');
  console.log('\nYou can now run:');
  console.log('  make all          # Full orchestration');
  console.log('  make gemini-ultra # Individual agent\n');
}

checkEnv();
