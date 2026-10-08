import { appendFileSync } from 'node:fs';

const outputFile = process.env.GITHUB_OUTPUT;
const isManual = process.env.GITHUB_EVENT_NAME === 'workflow_dispatch';

function output(name, value) {
  const line = `${name}=${value}\n`;
  if (outputFile) appendFileSync(outputFile, line);
  console.log(line.trim());
}

function hash(value) {
  return [...value].reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 7);
}

if (isManual) {
  output('tasks', '1');
  output('reason', 'manual');
  process.exit(0);
}

const now = new Date(Date.now() + (7 * 60 * 60 * 1000));
const date = now.toISOString().slice(0, 10);
const hour = now.getUTCHours();
const firstHour = 8;
const lastHour = 20;
const targetHour = firstHour + (hash(date) % (lastHour - firstHour + 1));
const shouldRun = hour === targetHour;

output('tasks', shouldRun ? '1' : '0');
output('reason', shouldRun ? `scheduled-${targetHour}:00-wib` : `waiting-${targetHour}:00-wib`);
