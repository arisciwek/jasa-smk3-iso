import fs from 'node:fs';
import path from 'node:path';

// Helper to generate precise, responsive vector SVG art/icons
const icons = {
  smk3: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="10" fill="#141519" stroke="rgba(255,255,255,0.08)"/>
    <circle cx="50" cy="50" r="35" stroke="#10b981" stroke-width="4" stroke-dasharray="6 4"/>
    <path d="M50 25 V75 M25 50 H75" stroke="#10b981" stroke-width="8" stroke-linecap="round"/>
    <text x="50" y="90" font-family="monospace" font-size="8" fill="#8a8f98" text-anchor="middle">SAFETY FIRST</text>
  </svg>`,
  iso: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="10" fill="#141519" stroke="rgba(255,255,255,0.08)"/>
    <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" stroke="#5e6ad2" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="50" cy="55" r="15" stroke="#5e6ad2" stroke-width="3"/>
    <text x="50" y="59" font-family="monospace" font-size="12" font-weight="bold" fill="#f7f8f8" text-anchor="middle">ISO</text>
  </svg>`,
  map: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="10" fill="#141519" stroke="rgba(255,255,255,0.08)"/>
    <path d="M20 50 Q 35 40, 50 55 T 80 45" stroke="rgba(255,255,255,0.2)" stroke-width="3" fill="none"/>
    <circle cx="50" cy="55" r="5" fill="#10b981"/>
    <circle cx="50" cy="55" r="12" stroke="#10b981" stroke-width="1.5" stroke-dasharray="2 2"/>
    <text x="50" y="80" font-family="monospace" font-size="8" fill="#10b981" text-anchor="middle">ONSITE SERVICE</text>
  </svg>`
};

const outputDir = './public/assets/images';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, 'icon-smk3.svg'), icons.smk3);
fs.writeFileSync(path.join(outputDir, 'icon-iso.svg'), icons.iso);
fs.writeFileSync(path.join(outputDir, 'icon-map.svg'), icons.map);

console.log('SVG assets generated successfully.');
