const UNDEFINED: string = 'undefined';

const _x: string = process.argv[2];
const _y: string = process.argv[3];

function split(x: string, h: number): Array<string> {
  let f: string;
  let s: string;
  const l = x.length;
  if(l > 1) {
    f = x.substr(0, x.length - h);
    s = x.substr(x.length - h);
    return [f, s];
  }
  return ['0', x];
}

function karatsuba_base(x: string, y: string): string {
  const _x: number = parseInt(x, 10);
  const _y: number = parseInt(y, 10);
  return `${_x * _y}`;
}

function sum(x: string, y: string): string {
  let digits: Array<number> = [];
  let carry: number = 0;
  const len = Math.max(x.length, y.length);
  const _x: Array<string> = x.split('').reverse();
  const _y: Array<string> = y.split('').reverse();

  for(let i = 0; i < len; i++) {
    const xi = _x[i];
    const yi = _y[i];
    const a: number = typeof xi === UNDEFINED ? 0 : parseInt(xi, 10);
    const b: number = typeof yi === UNDEFINED ? 0 : parseInt(yi, 10);
    const curr = a + b + carry;
    const digit = curr % 10;
    digits.push(digit);
    carry = Math.floor(curr / 10)
  }
  if(carry !== 0) {
    digits.push(carry);
  }

  digits = digits.reverse();

  const ret: string = digits.join('');
  
  return ret;
}

function diff(x: string, y: string): string {
  let digits: Array<number> = [];
  let carry: number = 0;

  const len = Math.max(x.length, y.length);
  const _x: Array<string> = x.split('').reverse();
  const _y: Array<string> = y.split('').reverse();

  for(let i = 0; i < len; i++) {
    const xi = _x[i];
    const yi = _y[i];
    const a: number = typeof xi === UNDEFINED ? 0 : parseInt(xi, 10);
    const b: number = typeof yi === UNDEFINED ? 0 : parseInt(yi, 10);
    const curr = a - (b + carry);
    const digit = curr < 0 ? 10 + curr : curr;
    carry = curr < 0 ? 1 : 0;
    digits.push(digit);
  }

  digits = digits.reverse();

  const ret: string = digits.join('');
  
  return ret;
}

function times_tenth_power(x: string, n: number): string {
  let r: string;
  if (x === '0') {
    return '0';
  }
  if (n === 0) {
    return x;
  }
  return `${x}${'0'.repeat(n)}`;
}

function karatsuba(x: string, y: string): string {
  if(x.length === 1 || y.length === 1) {
    return karatsuba_base(x, y);
  }
  const n = Math.min(x.length, y.length);
  const h: number = Math.floor(n / 2);
  const [a, b]: Array<string> = split(x, h);
  const [c, d]: Array<string> = split(y, h);

  const ac: string = karatsuba(a, c);
  const bd: string = karatsuba(b, d);
  
  const ab: string = sum(a, b);
  const cd: string = sum(c, d);
  const bdac: string = sum(bd, ac);

  const ab_cd: string = karatsuba(ab, cd);

  const p1: string = times_tenth_power(ac, 2 * h);
  const _p2: string = diff( ab_cd, bdac );
  const p2: string = times_tenth_power(_p2, h);
  const p1p2: string = sum(p1, p2);

  return sum(p1p2, bd);
}

const result = karatsuba(_x, _y);
console.log(result);
