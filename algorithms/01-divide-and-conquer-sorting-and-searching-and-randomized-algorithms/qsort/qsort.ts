import * as _ from 'lodash';

let comparisons: number = 0;

function Swap(A: Array<number>, i: number, j: number): void {
    const tmp: number = A[i];
    A[i] = A[j];
    A[j] = tmp;
}

/* Partition (A,l,r)
       p:= A[l]
       i:= l+1
       for j=l+1 to r
           if A[j] < p
               swap A[j] and A[i]
               i:= i+1
       swap A[l] and A[i - 1] */

function Partition(A: Array<number>, l: number, r: number, pi: number): number {
    const p: number = A[pi];
    let i: number = l + 1;
    for(let j: number = l + 1; j <= r; j++) {
        if(A[j] < p) {
            Swap(A, i, j);
            i++;
        }
    }
    Swap(A, l, i - 1);
    return i - 1;
}

function ChoosePivot(A: Array<number>, l: number, r: number): number {
    return l;
}

/* QuickSort (array A, length n)
       If n=1 return
       p = ChoosePivot(A,n)
       Partition A around p
       Recursively sort 1st part
       Recursively sort 2nd part */

function QuickSort(A: Array<number>, l: number, r: number): void {
    if(l >= r) {
        return;
    }
    comparisons += r - l
    const pi: number = ChoosePivot(A, l, r);
    const npi = Partition(A, l, r, pi);
    // console.log(`l[${l}] r[${r}] pi[${pi}] npi[${npi}] A[${A.join(', ')}]`);
    QuickSort(A, l, npi - 1);
    QuickSort(A, npi + 1, r);
}

const x: Array<number> = [1,2,3,4,5,6,7,8,9];
const y: Array<number> = _.shuffle(x);
console.log(`[${y.join(', ')}]`);
QuickSort(y, 0, y.length - 1);
console.log(`[${y.join(', ')}]`);
console.log(`comparisons = ${comparisons}`);
