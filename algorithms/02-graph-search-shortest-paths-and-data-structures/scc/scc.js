"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const sourceMapSupport = require("source-map-support");
sourceMapSupport.install();
class Graph {
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
const prod = true;
const inputT = '7 1\n5 2\n9 3\n1 4\n8 5\n3 6\n8 6\n4 7\n9 7\n2 8\n6 9\n';
const inputP = fs.readFileSync('./scc.txt').toString();
const input = prod ? inputP.trim() : inputT.trim();
const lines = input.split('\n');
const graph = new Graph();
for (const line of lines) {
    const [strSrc, strDst] = line.trim().split(' ');
    const [src, dst] = [
        parseInt(strSrc, 10),
        parseInt(strDst, 10),
    ];
    graph.vertices[src] = (_a = graph.vertices[src]) !== null && _a !== void 0 ? _a : [];
    graph.vertices[src].push(dst);
    graph.reverse[dst] = (_b = graph.reverse[dst]) !== null && _b !== void 0 ? _b : [];
    graph.reverse[dst].push(src);
}
function dfs(g, vertex, reverse) {
    var _a;
    g.explored[vertex] = true;
    g.leader[g.currentLeader] = (_a = g.leader[g.currentLeader]) !== null && _a !== void 0 ? _a : [];
    g.leader[g.currentLeader].push(vertex);
    let vertices = reverse
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
const n = graph.vertices.length - 1;
for (let i = n; i >= 1; i--) {
    if (!graph.explored[i]) {
        graph.currentLeader = i;
        dfs(graph, i, true);
    }
}
graph.init();
for (let i = n; i >= 1; i--) {
    if (!graph.explored[graph.finish[i]]) {
        graph.currentLeader = graph.finish[i];
        dfs(graph, graph.finish[i], false);
    }
}
const lengths = Object.values(graph.leader).map((arr) => {
    return arr.length;
});
console.log(lengths.sort((a, b) => {
    return b - a;
}));
//# sourceMappingURL=scc.js.map