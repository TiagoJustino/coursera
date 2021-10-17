import * as fs from 'fs';
import * as path from 'path';

function uniq(a) {
  const seen = {};
  return a.filter((item) => {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

const inputStr: string = fs
  .readFileSync(path.join(__dirname, '2sum.txt'))
  .toString();
let input: Array<number> = inputStr
  .trim()
  .split('\n')
  .map((line: string): number => {
    return parseInt(line.trim(), 10);
  });

input = uniq(input).sort();

let foundCounter: number = 0;

const hashtable = new Set();
for (const i of input) {
  hashtable.add(i);
}

let target: number = -10000;
while (target < 10001) {
  for (const x of input) {
    const y = target - x;
    if (x != y && hashtable.has(y)) {
      foundCounter++;
      console.log(target);
      break;
    }
  }
  target++;
}

console.log(foundCounter);
