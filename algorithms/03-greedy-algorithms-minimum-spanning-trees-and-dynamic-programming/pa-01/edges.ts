import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import * as sourceMapSupport from 'source-map-support';

sourceMapSupport.install();

const prod: boolean = true;

const inputT: string = '\n';
const inputP: string = fs
  .readFileSync(path.join(__dirname, 'edges.txt'))
  .toString();
const input: string = prod ? inputP.trim() : inputT.trim();

const [_firstLine, ...lines]: Array<string> = input.split('\n');

const nodes: Set<number> = new Set();
const treeNodes: Set<number> = new Set();
const edges: Record<number, Record<number, number>> = {};
let start: number = null;
for (const line of lines) {
  const [strNodeA, strNodeB, strWeight]: Array<string> = line
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
  edges[nodeA] = edges[nodeA] ?? {};
  edges[nodeB] = edges[nodeB] ?? {};
  edges[nodeA][nodeB] = weight;
  edges[nodeB][nodeA] = weight;
}

const notIncludedYet: Set<number> = new Set(nodes);
treeNodes.add(start);
notIncludedYet.delete(start);
let total: number = 0;
while (!_.isEqual(nodes, treeNodes)) {
  let weight: number = Number.MAX_SAFE_INTEGER;
  let nodeB: number = null;
  for(const source of treeNodes) {
    for(const destiny of notIncludedYet) {
      if(edges[source][destiny] && edges[source][destiny] < weight) {
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
