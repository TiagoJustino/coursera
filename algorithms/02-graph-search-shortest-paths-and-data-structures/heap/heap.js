"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heap = void 0;
const sourceMapSupport = require("source-map-support");
sourceMapSupport.install();
class Heap {
    constructor(fn) {
        this.comp = fn;
        this.elements = [];
    }
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    swap(indexA, indexB) {
        const temp = this.elements[indexA];
        this.elements[indexA] = this.elements[indexB];
        this.elements[indexB] = temp;
    }
    bubbleUp(index) {
        const parentIndex = this.getParentIndex(index);
        if (this.comp(this.elements[index], this.elements[parentIndex])) {
            this.swap(parentIndex, index);
            if (parentIndex != 0) {
                this.bubbleUp(parentIndex);
            }
        }
    }
    insert(element) {
        this.elements.push(element);
        this.bubbleUp(this.elements.length - 1);
    }
    bubbleDown(index) {
        const value = this.elements[index];
        const lChildIndex = index * 2 + 1;
        const rChildIndex = index * 2 + 2;
        const lChild = this.elements[lChildIndex];
        const rChild = this.elements[rChildIndex];
        if (typeof rChild !== 'undefined') {
            if (this.comp(rChild, lChild)) {
                if (this.comp(rChild, value)) {
                    this.swap(index, rChildIndex);
                    this.bubbleDown(rChildIndex);
                }
            }
            else {
                if (this.comp(lChild, value)) {
                    this.swap(index, lChildIndex);
                    this.bubbleDown(lChildIndex);
                }
            }
        }
        else if (typeof lChild !== 'undefined') {
            if (this.comp(lChild, value)) {
                this.swap(index, lChildIndex);
                this.bubbleDown(lChildIndex);
            }
        }
    }
    pop() {
        this.swap(0, this.elements.length - 1);
        const element = this.elements.pop();
        if (this.elements.length > 0) {
            this.bubbleDown(0);
        }
        return element;
    }
}
exports.Heap = Heap;
function lt(a, b) {
    return a < b;
}
const input = '6331\n2793\n1640\n9290\n225\n625\n6195\n2303\n5685\n1354\n4292\n7600\n';
const numbers = input
    .trim()
    .split('\n')
    .map((line) => {
    return parseInt(line.trim(), 10);
});
const heap = new Heap(lt);
for (const n of numbers) {
    heap.insert(n);
}
//# sourceMappingURL=heap.js.map