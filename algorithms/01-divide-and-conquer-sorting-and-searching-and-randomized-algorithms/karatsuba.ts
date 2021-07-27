import { BigNumber } from "bignumber.js";

const _x: string = '12345678901234567890';
const _y: string = '98765432109876543210';
const _xbn: BigNumber = new BigNumber(_x);
const _ybn: BigNumber = new BigNumber(_y);

console.log(_xbn.times(_ybn).toFixed());

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
  // TODO
  return (parseInt(x, 10) * parseInt(y, 10)).toString()
}

function sum(x: string, y: string): string {
  // TODO
  const _x: BigNumber = new BigNumber(x);
  const _y: BigNumber = new BigNumber(y);
  return _x.plus(_y).toFixed();
}

function diff(x: string, y: string): string {
  // TODO
  const _x: BigNumber = new BigNumber(x);
  const _y: BigNumber = new BigNumber(y);
  return _x.minus(_y).toFixed();
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
  
  const p1: string = times_tenth_power(ac, 2 * h);
  const _p2: string = diff(
    karatsuba(sum(a, b), sum(c, d)),
    sum(bd, ac)
  );
  const p2: string = times_tenth_power(_p2, h);
  return sum(sum(p1, p2), bd);
}

console.log(karatsuba(_x, _y));
