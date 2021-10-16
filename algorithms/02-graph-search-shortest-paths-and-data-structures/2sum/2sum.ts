import * as fs from 'fs';
import * as path from 'path';

const input: string = fs
  .readFileSync(path.join(__dirname, '2sum.txt'))
  .toString();
const tmp = { numbers: null };
tmp.numbers = input
  .trim()
  .split('\n')
  .map((line: string): string => {
    return line.trim();
  });

const hashtable = {};

for (const n of tmp.numbers) {
  hashtable[n] = true;
}

delete tmp.numbers;

let targetsFound: number = 0;

const keys: Array<string> = Object.keys(hashtable);
for (let target: number = -10000; target <= 10000; target++) {
  let found: boolean = false;
  let x: number;
  let y: number;
  for (const strX of keys) {
    x = parseInt(strX, 10);
    y = target - x;
    if (y != x && hashtable[`${y}`]) {
      targetsFound++;
      found = true;
      break;
    }
  }
  console.log(`target ${target} ${found ? `found ${x} + ${y}` : 'not found'}`);
}

console.log(targetsFound);
