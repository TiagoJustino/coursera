import * as fs from 'fs';
import * as sourceMapSupport from 'source-map-support';

sourceMapSupport.install();

class Graph {
  vertices: Array<number>;
  edges: Record<number, Record<number, number>>;
  shortestPath: Record<number, number>;

  constructor() {
    this.vertices = [];
    this.edges = {};
    this.shortestPath = {};
  }

  insert(src: number, dst: number, len: number) {
    if (!this.vertices.includes(src)) {
      this.vertices.push(src);
      this.edges[src] = this.edges[src] ?? {};
    }
    if (!this.vertices.includes(dst)) {
      this.vertices.push(dst);
      this.edges[dst] = this.edges[dst] ?? {};
    }
    this.edges[src][dst] = len;
  }

  dijkstra(src: number) {
    const processed: Array<number> = [src];
    const notProcessed: Array<number> = [...this.vertices];

    this.shortestPath[src] = 0;
    notProcessed.splice(notProcessed.indexOf(src), 1);

    while (processed.length !== this.vertices.length) {
      let min: number = Number.MAX_SAFE_INTEGER;
      let newVertex: number = null;
      for (const v of processed) {
        const shortestPath: number = this.shortestPath[v];
        for (const w of notProcessed) {
          const len: number = this.edges[v][w];
          if (shortestPath !== undefined && len !== undefined) {
            if (min > shortestPath + len) {
              min = shortestPath + len;
              newVertex = w;
            }
          }
        }
      }

      this.shortestPath[newVertex] = min;
      processed.push(newVertex);
      notProcessed.splice(notProcessed.indexOf(newVertex), 1);
    }
  }
}

const prod: boolean = true;
const inputT: string = '1  2,1 3,4\n2  3,2 4,6\n3  4,3\n';
const inputP: string = fs.readFileSync('./dijkstra.txt').toString();
const input: string = prod ? inputP.trim() : inputT.trim();
const lines: Array<string> = input.split('\n');
const graph: Graph = new Graph();

for (const line of lines) {
  const [srcStr, ...strDsts]: Array<string> = line
    .trim()
    .split(/[^0-9,][^0-9,]*/);
  const src: number = parseInt(srcStr, 10);
  for (const strDst of strDsts) {
    const [dstStr, dstLength]: Array<string> = strDst.split(',');
    const dst: number = parseInt(dstStr, 10);
    const length: number = parseInt(dstLength, 10);
    graph.insert(src, dst, length);
  }
}

graph.dijkstra(1);
const targets: Array<number> = [7, 37, 59, 82, 99, 115, 133, 165, 188, 197];
const answer: Array<number> = targets.map((target: number): number => {
  return graph.shortestPath[target];
});
console.log(answer.join(','));
