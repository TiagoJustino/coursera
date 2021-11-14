"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const sourceMapSupport = require("source-map-support");
sourceMapSupport.install();
const prod = true;
const inputT = '\n';
const inputP = fs
    .readFileSync(path.join(__dirname, 'edges.txt'))
    .toString();
const input = prod ? inputP.trim() : inputT.trim();
const [_firstLine, ...lines] = input.split('\n');
const nodes = new Set();
const treeNodes = new Set();
const edges = {};
let start = null;
for (const line of lines) {
    const [strNodeA, strNodeB, strWeight] = line
        .trim()
        .split(/  */);
    const [nodeA, nodeB, weight] = [
        parseInt(strNodeA.trim(), 10),
        parseInt(strNodeB.trim(), 10),
        parseInt(strWeight.trim(), 10),
    ];
    start = start || nodeA;
    nodes.add(nodeA);
    nodes.add(nodeB);
    edges[nodeA] = (_a = edges[nodeA]) !== null && _a !== void 0 ? _a : {};
    edges[nodeB] = (_b = edges[nodeB]) !== null && _b !== void 0 ? _b : {};
    edges[nodeA][nodeB] = weight;
    edges[nodeB][nodeA] = weight;
}
const notIncludedYet = new Set(nodes);
treeNodes.add(start);
notIncludedYet.delete(start);
let total = 0;
while (!_.isEqual(nodes, treeNodes)) {
    let weight = Number.MAX_SAFE_INTEGER;
    let nodeB = null;
    for (const source of treeNodes) {
        for (const destiny of notIncludedYet) {
            if (edges[source][destiny] && edges[source][destiny] < weight) {
                nodeB = destiny;
                weight = edges[source][destiny];
            }
        }
    }
    treeNodes.add(nodeB);
    notIncludedYet.delete(nodeB);
    total += weight;
}
console.log(total);
//# sourceMappingURL=edges.js.map