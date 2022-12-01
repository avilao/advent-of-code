import fs from 'fs';

export function readFile(filename, currentPath) {
  return fs.readFileSync(new URL(filename, currentPath), 'utf8').trimEnd();
}
