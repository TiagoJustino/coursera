import * as sourceMapSupport from 'source-map-support';

sourceMapSupport.install();

type CompFunction = (a: number, b: number) => boolean;

class Heap {
  comp: CompFunction;
  elements: Array<number>;

  constructor(fn: CompFunction) {
    this.comp = fn;
    this.elements = [];
  }

  getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  swap(indexA: number, indexB: number): void {
    const temp: number = this.elements[indexA];
    this.elements[indexA] = this.elements[indexB];
    this.elements[indexB] = temp;
  }

  bubbleUp(index: number): void {
    const parentIndex = this.getParentIndex(index);
    if (this.comp(this.elements[index], this.elements[parentIndex])) {
      this.swap(parentIndex, index);
      if (parentIndex != 0) {
        this.bubbleUp(parentIndex);
      }
    }
  }

  insert(element: number): void {
    this.elements.push(element);
    this.bubbleUp(this.elements.length - 1);
    /*
        console.log(`inserted [${element}] [${this.elements.join(',')}]`);
         */
  }

  bubbleDown(index: number) {
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
      } else {
        if (this.comp(lChild, value)) {
          this.swap(index, lChildIndex);
          this.bubbleDown(lChildIndex);
        }
      }
    } else if (typeof lChild !== 'undefined') {
      if (this.comp(lChild, value)) {
        this.swap(index, lChildIndex);
        this.bubbleDown(lChildIndex);
      }
    }
  }

  pop(): number {
    this.swap(0, this.elements.length - 1);
    const element: number = this.elements.pop();
    if (this.elements.length > 0) {
      this.bubbleDown(0);
    }
    return element;
  }
}

function lt(a: number, b: number): boolean {
  return a < b;
}

const input: string =
  '6331\n2793\n1640\n9290\n225\n625\n6195\n2303\n5685\n1354\n4292\n7600\n';
const numbers: Array<number> = input
  .trim()
  .split('\n')
  .map((line: string): number => {
    return parseInt(line.trim(), 10);
  });

const heap: Heap = new Heap(lt);

for (const n of numbers) {
  heap.insert(n);
}

/*
while (heap.elements.length > 0) {
  console.log(`poped [${heap.pop()}]`);
}
 */

export { Heap };
