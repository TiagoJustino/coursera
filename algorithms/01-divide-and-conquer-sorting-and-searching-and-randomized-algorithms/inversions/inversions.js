const fs = require("fs");

input = fs.readFileSync('/dev/stdin').toString().split('\n').map(x => parseInt(x.trim(), 10)).filter(x => !Number.isNaN(x));

function log(str) {
  if(process.env.DEBUG) {
    console.log(str);
  }
}

function countAndMerge(left, right, n=0) {
  log(`countAndMerge[${n}] left=[${left}] right=[${right}]`);
  let i = 0;
  let j = 0;
  let count = 0;
  const merged = [];

 while(i < left.length && j < right.length) {
    if(left[i] < right[j]) {
      merged.push(left[i]);
      i++;
    } else {
      merged.push(right[j]);
      j++;
      count += left.length - i;
    }
  }

  while(i < left.length) {
    merged.push(left[i]);
    i++;
  }
  while(j < right.length) {
    merged.push(right[j]);
    j++;
  }

  const result = {count, arr: merged};
  log(`countAndMerge[${n}] result=[${JSON.stringify(result)}]`);
  return result;
}

function countAndSort(arr, n=0, s='-') {
  log(`countAndSort[${n}][${s}] arr=[${arr}]`);
  const length = arr.length;
  if(length === 1) {
    return {count: 0, arr};
  }
  const half = Math.floor(length / 2);
  const left = countAndSort(arr.slice(0, half), n+1, 'l');
  const right = countAndSort(arr.slice(half), n+1, 'r');
  const merged = countAndMerge(left.arr, right.arr, n);
  const result = {
    count: left.count + right.count + merged.count,
    arr: merged.arr
  };
  log(`countAndSort[${n}][${s}] result=[${JSON.stringify(result)}]`);
  return result;
}

function inversions(arr) {
  return countAndSort(arr).count;
}

console.log(inversions(input));
