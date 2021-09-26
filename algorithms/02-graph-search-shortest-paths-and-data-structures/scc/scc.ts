import * as fs from 'fs';
import * as sourceMapSupport from 'source-map-support';

sourceMapSupport.install();

class Graph {
  vertices: Array<Array<number>>;
  reverse: Array<Array<number>>;
  explored: Record<number, boolean>;
  leader: Record<number, Array<number>>;
  finish: Array<number>;
  currentLeader: number;
  time: number;

  constructor() {
    this.vertices = [];
    this.reverse = [];
    this.finish = [];
    this.init();
  }

  init() {
    this.leader = {};
    this.time = 0;
    this.currentLeader = null;
    this.explored = {};
  }
}

const prod: boolean = true;
const inputT: string =
  '7 1\n5 2\n9 3\n1 4\n8 5\n3 6\n8 6\n4 7\n9 7\n2 8\n6 9\n';
const inputP: string = fs.readFileSync('./scc.txt').toString();
const input: string = prod ? inputP.trim() : inputT.trim();
const lines: Array<string> = input.split('\n');
const graph: Graph = new Graph();
for (const line of lines) {
  const [strSrc, strDst]: Array<string> = line.trim().split(' ');
  const [src, dst]: Array<number> = [
    parseInt(strSrc, 10),
    parseInt(strDst, 10),
  ];
  graph.vertices[src] = graph.vertices[src] ?? [];
  graph.vertices[src].push(dst);
  graph.reverse[dst] = graph.reverse[dst] ?? [];
  graph.reverse[dst].push(src);
}

function dfs(g: Graph, vertex: number, reverse: boolean): void {
  g.explored[vertex] = true;
  g.leader[g.currentLeader] = g.leader[g.currentLeader] ?? [];
  g.leader[g.currentLeader].push(vertex);
  let vertices: Array<number> = reverse
    ? g.reverse[vertex]
    : g.vertices[vertex];
  vertices = vertices || [];
  for (const j of vertices) {
    if (!g.explored[j]) {
      dfs(g, j, reverse);
    }
  }
  g.time++;
  if (reverse) {
    g.finish[g.time] = vertex;
  }
}

const n: number = graph.vertices.length - 1;

for (let i: number = n; i >= 1; i--) {
  if (!graph.explored[i]) {
    graph.currentLeader = i;
    dfs(graph, i, true);
  }
}

graph.init();
for (let i: number = n; i >= 1; i--) {
  if (!graph.explored[graph.finish[i]]) {
    graph.currentLeader = graph.finish[i];
    dfs(graph, graph.finish[i], false);
  }
}

const lengths: Array<number> = Object.values(graph.leader).map(
  (arr: Array<number>): number => {
    return arr.length;
  },
);

console.log(
  lengths.sort((a: number, b: number): number => {
    return b - a;
  }),
);
