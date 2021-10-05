import * as fs from 'fs';
import * as path from 'path';
import * as sourceMapSupport from 'source-map-support';
import { Heap } from '../heap/heap';

sourceMapSupport.install();

function lt(a: number, b: number) {
  return a < b;
}

function gt(a: number, b: number) {
  return a > b;
}

class Median {
  heapHalfLargest: Heap;
  heapHalfSmallest: Heap;

  constructor() {
    this.heapHalfLargest = new Heap(lt);
    this.heapHalfSmallest = new Heap(gt);
  }

  getMedian(): number {
    if (
      this.heapHalfLargest.elements.length ===
      this.heapHalfSmallest.elements.length
    ) {
      return this.heapHalfSmallest.elements[0];
    }
    return this.heapHalfLargest.elements.length >
      this.heapHalfSmallest.elements.length
      ? this.heapHalfLargest.elements[0]
      : this.heapHalfSmallest.elements[0];
  }

  insertBalanced(element: number): void {
    if (
      this.heapHalfLargest.elements.length >
      this.heapHalfSmallest.elements.length
    ) {
      this.heapHalfSmallest.insert(element);
    } else {
      this.heapHalfLargest.insert(element);
    }
  }

  insert(element: number) {
    if (element < this.heapHalfSmallest.elements[0]) {
      this.heapHalfSmallest.insert(element);
    } else if (element > this.heapHalfLargest.elements[0]) {
      this.heapHalfLargest.insert(element);
    } else {
      this.insertBalanced(element);
    }
    this.balance();
  }

  private balance() {
    if (
      Math.abs(
        this.heapHalfLargest.elements.length -
          this.heapHalfSmallest.elements.length,
      ) > 1
    ) {
      if (
        this.heapHalfLargest.elements.length >
        this.heapHalfSmallest.elements.length
      ) {
        this.heapHalfSmallest.insert(this.heapHalfLargest.pop());
      } else {
        this.heapHalfLargest.insert(this.heapHalfSmallest.pop());
      }
    }
  }
}

const prod: boolean = true;
const inputT: string =
  '6331\n2793\n1640\n9290\n225\n625\n6195\n2303\n5685\n1354\n4292\n7600\n';
const inputP: string = fs
  .readFileSync(path.join(__dirname, 'median.txt'))
  .toString();
const input: string = prod ? inputP : inputT;
const numbers: Array<number> = input
  .trim()
  .split('\n')
  .map((line: string): number => {
    return parseInt(line.trim(), 10);
  });

const median = new Median();
let answer = 0;
for (const n of numbers) {
  median.insert(n);
  answer = (answer + median.getMedian()) % 10000;
}

console.log(answer);
