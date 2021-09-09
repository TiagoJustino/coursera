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
    Swap(A, l, pi);
    const p: number = A[l];
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

type ChoosePivotFunction = (A: Array<number>, l: number, r: number) => number;
function ChoosePivotLeft(A: Array<number>, l: number, r: number): number {
    return l;
}

function ChoosePivotRight(A: Array<number>, l: number, r: number): number {
    return r;
}

function ChoosePivotMedian(A: Array<number>, l: number, r: number): number {
    return r;
}

/* QuickSort (array A, length n)
       If n=1 return
       p = ChoosePivot(A,n)
       Partition A around p
       Recursively sort 1st part
       Recursively sort 2nd part */

function QuickSort(A: Array<number>, l: number, r: number, ChoosePivot: ChoosePivotFunction): void {
    if(l >= r) {
        return;
    }
    comparisons += r - l
    const pi: number = ChoosePivot(A, l, r);
    const npi = Partition(A, l, r, pi);
    // console.log(`l[${l}] r[${r}] pi[${pi}] npi[${npi}] comparisons=[${comparisons}] A[${A.join(', ')}]`);
    QuickSort(A, l, npi - 1, ChoosePivot);
    QuickSort(A, npi + 1, r, ChoosePivot);
}

const x: Array<number> = [1,2,3,4];
const y: Array<number> = _.shuffle(x);
let z: Array<number>;

console.log('==== LEFT =================');
z = _.clone(y);
console.log(`[${z.join(', ')}]`);
comparisons = 0;
QuickSort(z, 0, y.length - 1, ChoosePivotLeft);
console.log(`[${z.join(', ')}]`);
console.log(`comparisons = ${comparisons}`);

console.log('==== RIGHT ================');

z = _.clone(y);
console.log(`[${z.join(', ')}]`);
comparisons = 0;
QuickSort(z, 0, y.length - 1, ChoosePivotRight);
console.log(`[${z.join(', ')}]`);
console.log(`comparisons = ${comparisons}`);

console.log('==== MEDIAN ===============');

z = _.clone(y);
console.log(`[${z.join(', ')}]`);
comparisons = 0;
QuickSort(z, 0, y.length - 1, ChoosePivotMedian);
console.log(`[${z.join(', ')}]`);
console.log(`comparisons = ${comparisons}`);
