"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const input = fs
    .readFileSync(path.join(__dirname, '2sum.txt'))
    .toString();
const tmp = { numbers: null };
tmp.numbers = input
    .trim()
    .split('\n')
    .map((line) => {
    return line.trim();
});
const hashtable = {};
for (const n of tmp.numbers) {
    hashtable[n] = true;
}
delete tmp.numbers;
let targetsFound = 0;
const keys = Object.keys(hashtable);
for (let target = -10000; target <= 10000; target++) {
    let found = false;
    let x;
    let y;
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
//# sourceMappingURL=2sum.js.map