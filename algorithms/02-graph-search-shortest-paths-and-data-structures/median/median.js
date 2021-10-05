"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const sourceMapSupport = require("source-map-support");
const heap_1 = require("../heap/heap");
sourceMapSupport.install();
function lt(a, b) {
    return a < b;
}
function gt(a, b) {
    return a > b;
}
class Median {
    constructor() {
        this.heapHalfLargest = new heap_1.Heap(lt);
        this.heapHalfSmallest = new heap_1.Heap(gt);
    }
    getMedian() {
        if (this.heapHalfLargest.elements.length ===
            this.heapHalfSmallest.elements.length) {
            return this.heapHalfSmallest.elements[0];
        }
        return this.heapHalfLargest.elements.length >
            this.heapHalfSmallest.elements.length
            ? this.heapHalfLargest.elements[0]
            : this.heapHalfSmallest.elements[0];
    }
    insertBalanced(element) {
        if (this.heapHalfLargest.elements.length >
            this.heapHalfSmallest.elements.length) {
            this.heapHalfSmallest.insert(element);
        }
        else {
            this.heapHalfLargest.insert(element);
        }
    }
    insert(element) {
        if (element < this.heapHalfSmallest.elements[0]) {
            this.heapHalfSmallest.insert(element);
        }
        else if (element > this.heapHalfLargest.elements[0]) {
            this.heapHalfLargest.insert(element);
        }
        else {
            this.insertBalanced(element);
        }
        this.balance();
    }
    balance() {
        if (Math.abs(this.heapHalfLargest.elements.length -
            this.heapHalfSmallest.elements.length) > 1) {
            if (this.heapHalfLargest.elements.length >
                this.heapHalfSmallest.elements.length) {
                this.heapHalfSmallest.insert(this.heapHalfLargest.pop());
            }
            else {
                this.heapHalfLargest.insert(this.heapHalfSmallest.pop());
            }
        }
    }
}
const prod = true;
const inputT = '6331\n2793\n1640\n9290\n225\n625\n6195\n2303\n5685\n1354\n4292\n7600\n';
const inputP = fs
    .readFileSync(path.join(__dirname, 'median.txt'))
    .toString();
const input = prod ? inputP : inputT;
const numbers = input
    .trim()
    .split('\n')
    .map((line) => {
    return parseInt(line.trim(), 10);
});
const median = new Median();
let answer = 0;
for (const n of numbers) {
    median.insert(n);
    answer = (answer + median.getMedian()) % 10000;
}
console.log(answer);
//# sourceMappingURL=median.js.map