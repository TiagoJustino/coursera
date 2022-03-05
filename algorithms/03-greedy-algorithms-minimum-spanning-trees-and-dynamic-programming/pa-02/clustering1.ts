// eslint-disable-next-line max-classes-per-file
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import * as sourceMapSupport from 'source-map-support';

class Edge {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public verticeA: Vertice,
    public verticeB: Vertice,
    public cost: number,
  ) // eslint-disable-next-line no-empty-function
  {}
}

class Vertice {
  constructor(public name: number, public cluster: Set<Vertice> = new Set()) {
    this.cluster.add(this);
  }
}

sourceMapSupport.install();

const prod: boolean = true;

const inputT: string = '\n';
const inputP: string = fs
  .readFileSync(path.join(__dirname, 'edges.txt'))
  .toString();
const input: string = prod ? inputP.trim() : inputT.trim();

const [_firstLine, ...lines]: Array<string> = input.split('\n');

const vertices: Set<Vertice> = new Set();
const edges: Array<Edge> = [];
const clusters: Set<Set<Vertice>> = new Set();

for (const line of lines) {
  const [strNodeA, strNodeB, strWeight]: Array<string> = line
    .trim()
    .split(/  */);
  const [verticeAName, verticeBName, cost] = [
    parseInt(strNodeA.trim(), 10),
    parseInt(strNodeB.trim(), 10),
    parseInt(strWeight.trim(), 10),
  ];
  const verticeA = new Vertice(verticeAName);
  const verticeB = new Vertice(verticeBName);
  vertices.add(verticeA);
  vertices.add(verticeB);
  clusters.add(verticeA.cluster);
  clusters.add(verticeB.cluster);
  edges.push(new Edge(verticeA, verticeB, cost));
}
