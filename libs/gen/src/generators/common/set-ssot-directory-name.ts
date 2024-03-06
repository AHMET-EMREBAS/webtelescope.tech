import { readFileSync, writeFileSync } from 'fs';
const SSOT_DIRECTORY_KEY = 'webpackagesSSOTDirectory';

const JSON_PATH = './package.json';

export function setSSOTDirectoryName(name: string) {
  const text = readFileSync(JSON_PATH).toString();

  const obj = JSON.parse(text);

  obj[SSOT_DIRECTORY_KEY] = name;

  const newText = JSON.parse(obj);

  writeFileSync(JSON_PATH, newText, 'utf-8');
}

export function getSSOTDirectoryName() {
  return JSON.parse(readFileSync(JSON_PATH).toString() || '{}')[
    SSOT_DIRECTORY_KEY
  ];
}
