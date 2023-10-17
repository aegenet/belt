import * as assert from 'node:assert';
import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';
import * as crypto from 'node:crypto';

function checkStringDumb(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    switch (str[i]) {
      case 'a':
      case 'b':
      case 'c':
      case 'd':
      case 'e':
      case 'f':
      case 'g':
      case 'h':
      case 'i':
      case 'j':
      case 'k':
      case 'l':
      case 'm':
      case 'n':
      case 'o':
      case 'p':
      case 'q':
      case 'r':
      case 's':
      case 't':
      case 'u':
      case 'v':
      case 'w':
      case 'x':
      case 'y':
      case 'z':
      case 'Z':
      case 'B':
      case 'C':
      case 'D':
      case 'E':
      case 'F':
      case 'G':
      case 'H':
      case 'I':
      case 'J':
      case 'K':
      case 'L':
      case 'M':
      case 'N':
      case 'O':
      case 'P':
      case 'Q':
      case 'R':
      case 'S':
      case 'T':
      case 'U':
      case 'V':
      case 'W':
      case 'X':
      case 'Y':
      case 'Z':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        break;
      default:
        return false;
    }
  }
  return true;
}

const mappy = {
  a: true,
  b: true,
  c: true,
  d: true,
  e: true,
  f: true,
  g: true,
  h: true,
  i: true,
  j: true,
  k: true,
  l: true,
  m: true,
  n: true,
  o: true,
  p: true,
  q: true,
  r: true,
  s: true,
  t: true,
  u: true,
  v: true,
  w: true,
  x: true,
  y: true,
  z: true,
  A: true,
  B: true,
  C: true,
  D: true,
  E: true,
  F: true,
  G: true,
  H: true,
  I: true,
  J: true,
  K: true,
  L: true,
  M: true,
  N: true,
  O: true,
  P: true,
  Q: true,
  R: true,
  S: true,
  T: true,
  U: true,
  V: true,
  W: true,
  X: true,
  Y: true,
  Z: true,
  '0': true,
  '1': true,
  '2': true,
  '3': true,
  '4': true,
  '5': true,
  '6': true,
  '7': true,
  '8': true,
  '9': true,
};

function checkStringObject(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    if (!mappy[str.charAt(i)]) {
      return false;
    }
  }
  return true;
}

function checkString(str: string): boolean {
  let char = '';
  for (let i = 0; i < str.length; i++) {
    char = str.charAt(i);
    if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9'))) {
      return false;
    }
  }
  return true;
}

const regex1 = /^[a-zA-Z0-9]+$/g;
const regex2 = /^[a-z0-9]+$/gi;

export async function alphanumFight(duration: number): Promise<RaceResult[]> {
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'alphanum fight',
    duration,
  });
  const stats = await racetrack.race(
    {
      name: '/^[a-zA-Z0-9]+$/g',
      explain: `
const map = new Map<number, unknown>();
const regex = /[a-zA-Z0-9]/g;
for (let i = 0; i < 10000; i++) {
  map.set(i, regex.test(crypto.randomBytes(20).toString('hex')));
}
return map;
`,
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<number, unknown>();
        for (let i = 0; i < 10000; i++) {
          map.set(i, regex1.test(crypto.randomBytes(20).toString('hex')));
        }
        return map;
      },
    },
    {
      name: '/^[a-z0-9]+$/gi',
      explain: `
const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, regex2.test);
}
`,
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<number, unknown>();
        for (let i = 0; i < 10000; i++) {
          map.set(i, regex2.test(crypto.randomBytes(20).toString('hex')));
        }
        return map;
      },
    },
    {
      name: 'checkString dumb',
      explain: `
const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, checkStringDumb);
}
`,
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<number, unknown>();
        for (let i = 0; i < 10000; i++) {
          map.set(i, checkStringDumb(crypto.randomBytes(20).toString('hex')));
        }
        return map;
      },
    },
    {
      name: 'checkString if',
      explain: `
const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, checkString);
}
`,
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<number, unknown>();
        for (let i = 0; i < 10000; i++) {
          map.set(i, checkString(crypto.randomBytes(20).toString('hex')));
        }
        return map;
      },
    },
    {
      name: 'checkString Object',
      explain: `
const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, checkStringObject);
}
`,
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<number, unknown>();
        for (let i = 0; i < 10000; i++) {
          map.set(i, checkStringObject(crypto.randomBytes(20).toString('hex')));
        }
        return map;
      },
    }
  );
  assert.ok(stats);
  return stats;
}
