import { appendFileSync } from 'node:fs';

const outputFile = process.env.GITHUB_OUTPUT;

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
// Window operasional lokal: satu slot pseudo-acak dipilih per hari.
// Pemilihan deterministik menjaga retry pada hari yang sama tetap idempotent.
const firstHour = 8;
const lastHour = 20;
const targetHour = firstHour + (hash(date) % (lastHour - firstHour + 1));
const inScheduleSlot = isManual || hour === targetHour;

if (!inScheduleSlot) {
  output('tasks', '0');
  output('worker', 'none');
  output('reason', `waiting-${targetHour}:00-wib`);
  process.exit(0)
}

// Pilih worker: article, jasa-smk3, atau jasa-iso
// Menggunakan hash deterministik agar hari yang sama selalu memilih worker yang sama
const workerTypes = ['article', 'jasa-smk3', 'jasa-iso'];
const selectedWorker = workerTypes[hash(date) % workerTypes.length];

output('tasks', '1');
output('worker', selectedWorker);
output('reason', isManual ? 'manual' : `scheduled-${targetHour}:00-wib`);
console.log(`Selected worker: ${selectedWorker}`);
