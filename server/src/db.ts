import fs from 'fs';

export const cards = JSON.parse(fs.readFileSync('./src/cards.json', 'utf-8'));
