import * as fs from "fs";

// const input: string = `1	2 3 4
// 2	1 3
// 3	1 2 4
// 4	1 3`;

// const input: string = `1	2 3 4
// 2	1 3 4
// 3	1 2 4 6
// 4	1 2 3 5
// 5	6 7 8 4
// 6	5 7 8 3
// 7	5 6 8
// 8	5 6 7`;

const input = fs.readFileSync('./kargerMinCut.txt').toString().trim();

const lines: Array<string> = input.split('\n')
    .map(
        (line: string): string => line.trim()
    );

function cloneArr(arr: Array<any>): Array<any> {
    const clone: Array<any> = [];
    for(const el of arr) {
        clone.push(el);
    }
    return clone;
}

class Edge {
    id: string;
    vertexA: Vertex;
    vertexB: Vertex;

    constructor(vertexA: Vertex, vertexB: Vertex) {
        const [left, right]: Array<Vertex> = [vertexA, vertexB].sort(compareById);
        this.vertexA = left;
        this.vertexB = right;
        this.id = `${left.id}-${right.id}`;
    }
}

class Vertex {
    id: string;
    edges: Array<Edge>;

    constructor(id: string) {
        this.id = id;
        this.edges = [];
    }

    addEdge(edge: Edge): void {
        if (!this.edges.includes(edge)) {
            this.edges.push(edge);
        }
    }

    removeEdge(edge: Edge): void {
        const index: number = this.edges.indexOf(edge);
        this.edges.splice(index, 1);
    }
}

class Graph {
    vertices: Record<string, Vertex>;
    edges: Array<Edge>;
    min: number;

    constructor() {
        this.vertices = {};
        this.edges = [];
        this.min = Number.MAX_SAFE_INTEGER;
    }

    addVertex(vertexId: string): void {
        const vertex = new Vertex(vertexId);
        this.vertices[vertex.id] = vertex;
    }

    addEdge(vertexA: Vertex, vertexB: Vertex): void {
        if (vertexA !== vertexB) {
            const edge = new Edge(vertexA, vertexB);
            vertexA.addEdge(edge);
            vertexB.addEdge(edge);
            this.edges.push(edge);
        }
    }

    hasEdgeId(id: string): boolean {
        return this.edges.map((edge: Edge): string => edge.id).includes(id);
    }

    getVertex(vertexId: string): Vertex {
        const vertex = new Vertex(vertexId);
        return this.vertices[vertex.id];
    }

    removeVertex(vertex: Vertex): void {
        delete this.vertices[vertex.id];
    }

    updateLooseEdges(oldVertex: Vertex, newVertex: Vertex): void {
        const edges = cloneArr(oldVertex.edges);
        for(const edge of edges) {
            if(edge.vertexA === oldVertex) {
                this.addEdge(edge.vertexB, newVertex);
            } else {
                this.addEdge(edge.vertexA, newVertex);
            }
            this.removeEdge(edge);
        }
    }

    removeSelfLoops(vertex: Vertex): void {
        for(const edge of vertex.edges) {
            if(edge.vertexA === edge.vertexB) {
                this.removeEdge(edge);
            }
        }
    }

    merge(vertexA: Vertex, vertexB: Vertex): void {
        const arrA = JSON.parse(vertexA.id);
        const arrB = JSON.parse(vertexB.id);
        const arr = [...arrA, ...arrB];
        const newId = JSON.stringify(arr);

        this.removeVertex(vertexA);
        this.removeVertex(vertexB);

        this.addVertex(newId)
        const newVertex: Vertex = this.getVertex(newId);
        this.updateLooseEdges(vertexA, newVertex);
        this.updateLooseEdges(vertexB, newVertex);
        this.removeSelfLoops(newVertex);
    }

    removeEdge(edge: Edge): void {
        const index: number = this.edges.indexOf(edge);
        edge.vertexA.removeEdge(edge);
        edge.vertexB.removeEdge(edge);
        this.edges.splice(index, 1);
    }

    contractEdge(index: number): void {
        const edge: Edge = this.edges[index];
        this.removeEdge(this.edges[index]);
        this.merge(edge.vertexA, edge.vertexB);
    }

    contract(): void {
        const index: number = Math.floor(Math.random()*this.edges.length);
        this.contractEdge(index);
    }

    print(): void {
        console.log(`vertices [${Object.keys(this.vertices).length}] {\n  ${Object.keys(this.vertices).join('\n  ')}\n}`);
        console.log(`edges [${this.edges.length}] {\n  ${this.edges.map(e => e.id).join('\n  ')}\n}`);
    }

    karger(): number {
        while (Object.keys(this.vertices).length > 2) {
            this.contract();
        }
        return this.edges.length;
    }

    clone(): Graph {
        const g = new Graph();
        const vs = Object.keys(this.vertices);
        for(const v of vs) {
            g.addVertex(v);
        }
        for(const e of this.edges) {
            const v1 = g.getVertex(e.vertexA.id);
            const v2 = g.getVertex(e.vertexB.id);
            g.addEdge(v1, v2);
        }
        return g;
    }

    kargerRepeated(rounds: number): number {
        for(let i = 0; i < rounds; i++) {
            // const prev = this.min;
            const g: Graph = this.clone();
            const k = g.karger();
            if(k < this.min) {
                this.min = k;
            }
            // console.log(`prev[${prev}], k[${k}], min[${this.min}]`);
        }
        return this.min;
    }
}

const graph: Graph = new Graph();
const vertexNeighbors: Array<Array<string>> = [];
for (const line of lines) {
    const [vertex, ...neighbors]: Array<string> = line.split(/[\t ][\t ]*/)
        .map(
            (el: string): string => el.trim()
        );
    vertexNeighbors.push([vertex, ...neighbors]);
    graph.addVertex(JSON.stringify([vertex]));
}

function compareById(a: Vertex, b: Vertex): number {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
}

for (const vertexNeighbor of vertexNeighbors) {
    const [vertex, ...neighbors]: Array<string> = vertexNeighbor;
    const vertexA: Vertex = graph.getVertex(JSON.stringify([vertex]));
    for (const neighbor of neighbors) {
        const vertexB: Vertex = graph.getVertex(JSON.stringify([neighbor]));
        const edge = new Edge(vertexA, vertexB);
        if (!graph.hasEdgeId(edge.id)) {
            graph.addEdge(vertexA, vertexB);
        }
    }
}

// graph.print();
console.log(graph.kargerRepeated(1000));
