"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const sourceMapSupport = require("source-map-support");
sourceMapSupport.install();
class Graph {
    constructor() {
        this.vertices = [];
        this.edges = {};
        this.shortestPath = {};
    }
    insert(src, dst, len) {
        var _a, _b;
        if (!this.vertices.includes(src)) {
            this.vertices.push(src);
            this.edges[src] = (_a = this.edges[src]) !== null && _a !== void 0 ? _a : {};
        }
        if (!this.vertices.includes(dst)) {
            this.vertices.push(dst);
            this.edges[dst] = (_b = this.edges[dst]) !== null && _b !== void 0 ? _b : {};
        }
        this.edges[src][dst] = len;
    }
    dijkstra(src) {
        const processed = [src];
        const notProcessed = [...this.vertices];
        this.shortestPath[src] = 0;
        notProcessed.splice(notProcessed.indexOf(src), 1);
        while (processed.length !== this.vertices.length) {
            let min = Number.MAX_SAFE_INTEGER;
            let newVertex = null;
            for (const v of processed) {
                const shortestPath = this.shortestPath[v];
                for (const w of notProcessed) {
                    const len = this.edges[v][w];
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
const prod = true;
const inputT = '1  2,1 3,4\n2  3,2 4,6\n3  4,3\n';
const inputP = fs.readFileSync('./dijkstra.txt').toString();
const input = prod ? inputP.trim() : inputT.trim();
const lines = input.split('\n');
const graph = new Graph();
for (const line of lines) {
    const [srcStr, ...strDsts] = line
        .trim()
        .split(/[^0-9,][^0-9,]*/);
    const src = parseInt(srcStr, 10);
    for (const strDst of strDsts) {
        const [dstStr, dstLength] = strDst.split(',');
        const dst = parseInt(dstStr, 10);
        const length = parseInt(dstLength, 10);
        graph.insert(src, dst, length);
    }
}
graph.dijkstra(1);
const targets = [7, 37, 59, 82, 99, 115, 133, 165, 188, 197];
const answer = targets.map((target) => {
    return graph.shortestPath[target];
});
console.log(answer.join(','));
//# sourceMappingURL=dijkstra.js.map