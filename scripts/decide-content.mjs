import { appendFileSync, readFileSync } from 'node:fs';

const outputFile = process.env.GITHUB_OUTPUT;
const plan = JSON.parse(readFileSync('content-plan.json', 'utf8'));
const pendingArticle = plan.articleIdeas.some((item) => item.status === 'planned');

function output(name, value) {
  const line = `${name}=${value}\n`;
  if (outputFile) appendFileSync(outputFile, line);
  console.log(line.trim());
}

function hash(value) {
  return [...value].reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 7);
}

const isManual = process.env.GITHUB_EVENT_NAME === 'workflow_dispatch';
const now = new Date(Date.now() + (7 * 60 * 60 * 1000));
const date = now.toISOString().slice(0, 10);
const hour = now.getUTCHours();
const firstHour = 8;
const lastHour = 20;
const targetHour = firstHour + (hash(date) % (lastHour - firstHour + 1));
const inScheduleSlot = isManual || hour === targetHour;

if (!inScheduleSlot) {
  output('tasks', '0');
  output('task', 'none');
  output('reason', `waiting-${targetHour}:00-wib`);
  process.exit(0);
}

output('tasks', '1');
output('task', pendingArticle ? 'create' : 'update');
output('reason', pendingArticle ? 'article-queue' : 'city-fallback');
