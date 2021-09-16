const input: string = `1	2 3 4
2	1 3 4
3	1 2 4 6
4	1 2 3 5
5	6 7 8 4
6	5 7 8 3
7	5 6 8
8	5 6 7`;

const lines: Array<string> = input.split('\n')
    .map(
        (line: string): string => line.trim()
    );

class Edge {
    id: string;
    vertexA: Vertex;
    vertexB: Vertex;

    constructor(vertexA: Vertex, vertexB: Vertex) {
        this.vertexA = vertexA;
        this.vertexB = vertexB;
        this.id = `${vertexA.id}-${vertexB.id}`;
    }
}

class Vertex {
    id: string;
    edges: Array<Edge>;

    constructor(id: string) {
        this.id = JSON.stringify([id]);
        this.edges = [];
    }

    addEdge(edge: Edge) {
        if (!this.edges.includes(edge)) {
            this.edges.push(edge);
        }
    }
}

class Graph {
    vertices: Record<string, Vertex>;
    edges: Array<Edge>;

    constructor() {
        this.vertices = {};
        this.edges = [];
    }

    addVertex(vertexId: string): void {
        const vertex = new Vertex(vertexId);
        this.vertices[vertex.id] = vertex;
    }

    addEdge(vertexA: Vertex, vertexB: Vertex): void {
        if (vertexA.id !== vertexB.id) {
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

    contract(): void {
        // TODO
        delete this.vertices[Object.keys(this.vertices)[0]];
    }

    karger(): number {
        while (Object.keys(this.vertices).length > 2) {
            this.contract();
        }
        return this.edges.length;
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
    graph.addVertex(vertex);
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
    const vertexA: Vertex = graph.getVertex(vertex);
    for (const neighbor of neighbors) {
        const vertexB: Vertex = graph.getVertex(neighbor);
        const [left, right]: Array<Vertex> = [vertexA, vertexB].sort(compareById);
        const edge = new Edge(left, right);
        if (!graph.hasEdgeId(edge.id)) {
            graph.addEdge(left, right);
        }
    }
}

console.log(graph.karger());
