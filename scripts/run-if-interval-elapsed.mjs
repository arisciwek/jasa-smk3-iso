import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const root = process.cwd();
const stateFile = join(root, 'automation-state', 'last-run.json');
const workflowType = process.env.WORKFLOW_TYPE;
const intervalHours = parseInt(process.env.INTERVAL_HOURS || '24', 10);

if (!workflowType) {
  console.error('WORKFLOW_TYPE environment variable is required');
  process.exit(1);
}

const intervals = {
  'article-create': 48,
  'article-update': 24,
  'jasa-smk3-create': 48,
  'jasa-smk3-update': 24,
  'jasa-iso-create': 48,
  'jasa-iso-update': 24,
};

const effectiveInterval = intervals[workflowType] || intervalHours;

function loadState() {
  if (existsSync(stateFile)) {
    return JSON.parse(readFileSync(stateFile, 'utf8'));
  }
  return {};
}

function saveState(state) {
  mkdirSync(join(root, 'automation-state'), { recursive: true });
  writeFileSync(stateFile, `${JSON.stringify(state, null, 2)}\n`);
}

function runGenerator() {
  const generators = {
    'article-create': 'generate-article-content.mjs',
    'article-update': 'generate-article-update.mjs',
    'jasa-smk3-create': 'generate-jasa-smk3-create.mjs',
    'jasa-smk3-update': 'generate-jasa-smk3-content.mjs',
    'jasa-iso-create': 'generate-jasa-iso-create.mjs',
    'jasa-iso-update': 'generate-jasa-iso-content.mjs',
  };

  const script = generators[workflowType];
  if (!script) {
    console.error(`Unknown workflow type: ${workflowType}`);
    process.exit(1);
  }

  console.log(`Running generator: ${script}`);
  try {
    execSync(`node scripts/${script}`, { stdio: 'inherit', cwd: root });
    return true;
  } catch (error) {
    console.error(`Generator failed: ${error.message}`);
    return false;
  }
}

function main() {
  const state = loadState();
  const lastRun = state[workflowType];
  const now = new Date();

  if (lastRun) {
    const elapsedHours = (now - new Date(lastRun)) / (1000 * 60 * 60);
    if (elapsedHours < effectiveInterval) {
      const remaining = (effectiveInterval - elapsedHours).toFixed(1);
      console.log(`Interval not elapsed for ${workflowType}. Last run: ${lastRun} (${elapsedHours.toFixed(1)}h ago). Need ${remaining}h more. Skipping.`);
      process.exit(0);
    }
  }

  console.log(`Interval elapsed for ${workflowType}. Last run: ${lastRun || 'never'}. Running generator...`);

  const success = runGenerator();

  if (success) {
    const timestamp = now.toISOString();
    state[workflowType] = timestamp;
    saveState(state);
    console.log(`Updated last-run for ${workflowType}: ${timestamp}`);

    // Commit state change
    try {
      execSync('git config user.name "smk3-iso-content-bot"', { stdio: 'ignore', cwd: root });
      execSync('git config user.email "smk3-iso-content-bot@users.noreply.github.com"', { stdio: 'ignore', cwd: root });
      execSync(`git add ${stateFile}`, { stdio: 'ignore', cwd: root });
      execSync(`git commit -m "chore: update last-run for ${workflowType}"`, { stdio: 'ignore', cwd: root });
      execSync('git push', { stdio: 'ignore', cwd: root });
      console.log('State committed and pushed');
    } catch (e) {
      console.warn('Failed to commit state (may be no changes or push failed):', e.message);
    }
  } else {
    console.error('Generator failed, state not updated');
    process.exit(1);
  }
}

main();