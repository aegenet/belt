# Benchmark Node.js v16.17.0

## Join array (3060 laps, 4096 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>rejoin()</td><td><pre lang="typescript"><code>

function rejoin(array: string[]) {
  let str2 = array[0];
  for (let i = 1; i < array.length; i++) {
    str2 += array[i];
  }
  return str2;
}

str2 = rejoin(samples);

</code></pre></td><td>33.03 ns</td><td>130.20 ns</td><td>38.23 ns</td><td style="color:green"><strong>34.30 ns</strong></td><td>35.40 ns</td><td>56.27 ns</td><td>1.00</td><td>116.99 μs</td>
</tr>

<tr>
    <td>2</td><td>String.concat</td><td><pre lang="typescript"><code>

str = ''.concat(... samples);

</code></pre></td><td>42.24 ns</td><td>306.84 ns</td><td>49.05 ns</td><td><strong>44.26 ns</strong></td><td>45.39 ns</td><td>68.85 ns</td><td>1.26</td><td>150.08 μs</td>
</tr>

<tr>
    <td>3</td><td>for +=</td><td><pre lang="typescript"><code>

str = samples[0];
for (let i = 1; i < samples.length; i++) {
  str += samples[i];
}

</code></pre></td><td>54.20 ns</td><td>441.48 ns</td><td>61.38 ns</td><td><strong>55.93 ns</strong></td><td>57.35 ns</td><td>81.30 ns</td><td>1.54</td><td>187.83 μs</td>
</tr>

<tr>
    <td>4</td><td>samples.join()</td><td><pre lang="typescript"><code>

str = samples.join();

</code></pre></td><td>573.51 ns</td><td>1.14 μs</td><td>668.45 ns</td><td><strong>648.88 ns</strong></td><td>663.99 ns</td><td>694.87 ns</td><td>15.94</td><td>2.05 ms</td>
</tr>

</table>

## War of Loop (7475 laps, 8192 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>while</td><td><pre lang="typescript"><code>

let i = 0;
while (i < samples.length) {
  // [...]
  i++;
}

</code></pre></td><td>13.28 ns</td><td>40.34 ns</td><td>18.52 ns</td><td style="color:green"><strong>17.71 ns</strong></td><td>17.99 ns</td><td>18.81 ns</td><td>1.00</td><td>138.46 μs</td>
</tr>

<tr>
    <td>2</td><td>for i</td><td><pre lang="typescript"><code>

for (let i = 0; i < samples.length; i++) {
  // [...]
}

</code></pre></td><td>12.63 ns</td><td>43.27 ns</td><td>18.62 ns</td><td><strong>17.85 ns</strong></td><td>18.13 ns</td><td>18.98 ns</td><td>1.01</td><td>139.16 μs</td>
</tr>

<tr>
    <td>3</td><td>forEach</td><td><pre lang="typescript"><code>

samples.forEach(val => {
  // [...]
});

</code></pre></td><td>14.39 ns</td><td>45.95 ns</td><td>20.66 ns</td><td><strong>19.81 ns</strong></td><td>20.14 ns</td><td>21.22 ns</td><td>1.12</td><td>154.47 μs</td>
</tr>

<tr>
    <td>4</td><td>for of</td><td><pre lang="typescript"><code>

for (const val of samples) {
  // [...]
}

</code></pre></td><td>15.73 ns</td><td>46.15 ns</td><td>21.41 ns</td><td><strong>20.35 ns</strong></td><td>20.69 ns</td><td>21.80 ns</td><td>1.15</td><td>160.01 μs</td>
</tr>

</table>

## Loop Key,Value from an object (2697 laps, 2048 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>for in</td><td><pre lang="typescript"><code>

for (const key in samples) {
  // ...
}

</code></pre></td><td>285.45 ns</td><td>707.37 ns</td><td>308.85 ns</td><td style="color:green"><strong>293.55 ns</strong></td><td>299.27 ns</td><td>351.07 ns</td><td>1.00</td><td>832.98 μs</td>
</tr>

<tr>
    <td>2</td><td>for of Object.entries()</td><td><pre lang="typescript"><code>

for (const [key, value] of Object.entries(samples)) {
  // ...
}

</code></pre></td><td>385.50 ns</td><td>845.17 ns</td><td>417.21 ns</td><td><strong>395.26 ns</strong></td><td>425.68 ns</td><td>458.59 ns</td><td>1.36</td><td>1.13 ms</td>
</tr>

<tr>
    <td>3</td><td>Object.keys() + for i</td><td><pre lang="typescript"><code>

const keys = Object.keys(samples);
for (let i = 0; i < keys.length; i++) {
  // ...
}

</code></pre></td><td>395.70 ns</td><td>1.28 μs</td><td>426.78 ns</td><td><strong>405.86 ns</strong></td><td>414.65 ns</td><td>464.31 ns</td><td>1.36</td><td>1.15 ms</td>
</tr>

<tr>
    <td>4</td><td>Object.keys().forEach</td><td><pre lang="typescript"><code>

Object.keys(samples).forEach(key => {
  // ...
});

</code></pre></td><td>399.02 ns</td><td>866.94 ns</td><td>429.37 ns</td><td><strong>409.13 ns</strong></td><td>417.38 ns</td><td>468.41 ns</td><td>1.37</td><td>1.16 ms</td>
</tr>

<tr>
    <td>5</td><td>for of Object.keys()</td><td><pre lang="typescript"><code>

for (const key of Object.keys(samples)) {
  // ...
}

</code></pre></td><td>400.39 ns</td><td>961.96 ns</td><td>432.31 ns</td><td><strong>411.82 ns</strong></td><td>420.70 ns</td><td>471.88 ns</td><td>1.38</td><td>1.17 ms</td>
</tr>

</table>

## Declare in loop or not (112 laps, 256 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>No var</td><td><pre lang="typescript"><code>

const map = new Map<number, number>();
for (let i = 0; i < 100; i++) {
  map.set(i, i * 5);
}

</code></pre></td><td>1.97 μs</td><td>3.77 μs</td><td>2.18 μs</td><td style="color:green"><strong>2.04 μs</strong></td><td>2.09 μs</td><td>2.84 μs</td><td>1.00</td><td>243.87 μs</td>
</tr>

<tr>
    <td>2</td><td>let out loop</td><td><pre lang="typescript"><code>

const map = new Map<number, number>();
let myVarOutLoop: number;
for (let i = 0; i < 100; i++) {
  myVarOutLoop = i * 5;
  map.set(i, myVarOutLoop);
}

</code></pre></td><td>1.99 μs</td><td>8.36 μs</td><td>2.24 μs</td><td><strong>2.05 μs</strong></td><td>2.10 μs</td><td>2.89 μs</td><td>1.01</td><td>250.64 μs</td>
</tr>

<tr>
    <td>3</td><td>const in loop</td><td><pre lang="typescript"><code>

const map = new Map<number, number>();
for (let i = 0; i < 10000; i++) {
  const myVarInLoop = i * 5;
  map.set(i, myVarInLoop);
}

</code></pre></td><td>491.76 μs</td><td>634.64 μs</td><td>524.10 μs</td><td><strong>513.57 μs</strong></td><td>533.84 μs</td><td>568.72 μs</td><td>231.90</td><td>58.70 ms</td>
</tr>

</table>

## Join a string with an array or with +=? (8887 laps, 8 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>+=</td><td><pre lang="typescript"><code>

let something = 'Hello
';
// ...
something += ' Mister';

</code></pre></td><td>7.14 μs</td><td>60.66 μs</td><td>8.19 μs</td><td style="color:green"><strong>7.50 μs</strong></td><td>7.73 μs</td><td>11.20 μs</td><td>1.00</td><td>72.79 ms</td>
</tr>

<tr>
    <td>2</td><td>array push join</td><td><pre lang="typescript"><code>

const strArray: string[] = [];
strArray.push('Hello');
strArray.push(' Mister');
const str = strArray.join();

</code></pre></td><td>23.78 μs</td><td>115.24 μs</td><td>27.51 μs</td><td><strong>25.05 μs</strong></td><td>25.78 μs</td><td>39.96 μs</td><td>3.44</td><td>244.52 ms</td>
</tr>

</table>

## (Get only, no set) Map VS Object VS switch VS if (3415 laps, 1024 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>If</td><td><pre lang="typescript"><code>
if (key === 'a') { return something }
</code></pre></td><td>246.39 ns</td><td>678.91 ns</td><td>264.58 ns</td><td style="color:green"><strong>254.49 ns</strong></td><td>257.62 ns</td><td>269.04 ns</td><td>1.00</td><td>903.54 μs</td>
</tr>

<tr>
    <td>2</td><td>Switch</td><td><pre lang="typescript"><code>
switch (key)
</code></pre></td><td>245.61 ns</td><td>662.50 ns</td><td>264.98 ns</td><td><strong>254.79 ns</strong></td><td>258.11 ns</td><td>268.36 ns</td><td>1.00</td><td>904.90 μs</td>
</tr>

<tr>
    <td>3</td><td>Map</td><td><pre lang="typescript"><code>
map.get(key)
</code></pre></td><td>321.58 ns</td><td>954.39 ns</td><td>352.10 ns</td><td><strong>335.64 ns</strong></td><td>340.23 ns</td><td>360.74 ns</td><td>1.33</td><td>1.20 ms</td>
</tr>

<tr>
    <td>4</td><td>Object</td><td><pre lang="typescript"><code>
obj[key]
</code></pre></td><td>325.59 ns</td><td>1.08 μs</td><td>355.07 ns</td><td><strong>338.48 ns</strong></td><td>343.26 ns</td><td>360.74 ns</td><td>1.33</td><td>1.21 ms</td>
</tr>

</table>

## [Set/Get] Map VS Object (1032 laps, 4096 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Object (numeric key)</td><td><pre lang="typescript"><code>
obj[1234] = value;
return obj[1234];

</code></pre></td><td>14.33 ns</td><td>51.37 ns</td><td>15.32 ns</td><td style="color:green"><strong>14.77 ns</strong></td><td>15.01 ns</td><td>15.77 ns</td><td>1.00</td><td>15.81 μs</td>
</tr>

<tr>
    <td>2</td><td>Map (numeric key)</td><td><pre lang="typescript"><code>
map.set(1234, value);
return map.get(1234);

</code></pre></td><td>15.50 ns</td><td>46.87 ns</td><td>19.10 ns</td><td><strong>18.09 ns</strong></td><td>19.92 ns</td><td>23.78 ns</td><td>1.36</td><td>19.72 μs</td>
</tr>

<tr>
    <td>3</td><td>Object (small key)</td><td><pre lang="typescript"><code>
obj['1234'] = value;
return obj['1234'];

</code></pre></td><td>19.95 ns</td><td>36.67 ns</td><td>21.11 ns</td><td><strong>20.43 ns</strong></td><td>20.78 ns</td><td>22.29 ns</td><td>1.39</td><td>21.79 μs</td>
</tr>

<tr>
    <td>4</td><td>Map (small key)</td><td><pre lang="typescript"><code>
map.set('1234', value);
return map.get('1234');

</code></pre></td><td>22.90 ns</td><td>54.81 ns</td><td>26.38 ns</td><td><strong>24.73 ns</strong></td><td>27.03 ns</td><td>29.79 ns</td><td>1.79</td><td>27.23 μs</td>
</tr>

<tr>
    <td>5</td><td>Object (symbol key)</td><td><pre lang="typescript"><code>
obj[Symbol.for(abcdef)] = value;
return obj[Symbol.for(abcdef)];

</code></pre></td><td>84.13 ns</td><td>175.95 ns</td><td>91.62 ns</td><td><strong>88.28 ns</strong></td><td>89.79 ns</td><td>92.82 ns</td><td>5.95</td><td>94.55 μs</td>
</tr>

<tr>
    <td>6</td><td>Map (symbol key)</td><td><pre lang="typescript"><code>
map.set(Symbol.for('abcdef'), value);
return map.get(Symbol.for('abcdef'));

</code></pre></td><td>83.96 ns</td><td>275.63 ns</td><td>95.75 ns</td><td><strong>91.75 ns</strong></td><td>96.12 ns</td><td>103.12 ns</td><td>6.39</td><td>98.81 μs</td>
</tr>

<tr>
    <td>7</td><td>Object</td><td><pre lang="typescript"><code>
obj['keywithalenght'] = value;
return obj['keywithalenght'];

</code></pre></td><td>67.21 ns</td><td>237.65 ns</td><td>117.46 ns</td><td><strong>118.07 ns</strong></td><td>119.63 ns</td><td>122.12 ns</td><td>7.90</td><td>121.22 μs</td>
</tr>

<tr>
    <td>8</td><td>Object (very long key)</td><td><pre lang="typescript"><code>
obj['1234'] = value;
return obj['1234'];

</code></pre></td><td>148.05 ns</td><td>338.70 ns</td><td>158.05 ns</td><td><strong>153.81 ns</strong></td><td>156.37 ns</td><td>160.89 ns</td><td>10.34</td><td>163.11 μs</td>
</tr>

<tr>
    <td>9</td><td>Map</td><td><pre lang="typescript"><code>
map.set('keywithalenght', value);
return map.get('keywithalenght');

</code></pre></td><td>63.38 ns</td><td>419.60 ns</td><td>194.85 ns</td><td><strong>196.39 ns</strong></td><td>210.79 ns</td><td>233.20 ns</td><td>14.06</td><td>201.09 μs</td>
</tr>

<tr>
    <td>10</td><td>Map (very long key)</td><td><pre lang="typescript"><code>
map.set('something-else-everyon-ok-super-ultra', value);
return map.get('something-else-everyon-ok-super-ultra');

</code></pre></td><td>217.82 ns</td><td>588.53 ns</td><td>261.92 ns</td><td><strong>243.68 ns</strong></td><td>283.45 ns</td><td>311.11 ns</td><td>18.40</td><td>270.30 μs</td>
</tr>

</table>

## If Else Return? (3259 laps, 1024 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>If Else One return</td><td><pre lang="typescript"><code>

let result;
if (xxx)
  result = a;
else if (yyyy)
  result = b;

return result;

</code></pre></td><td>247.66 ns</td><td>1.02 μs</td><td>262.74 ns</td><td style="color:green"><strong>254.30 ns</strong></td><td>257.52 ns</td><td>265.04 ns</td><td>1.00</td><td>856.26 μs</td>
</tr>

<tr>
    <td>2</td><td>If Multi return</td><td><pre lang="typescript"><code>

if (xxx)
  return a;
if (yyyy)
  return b;

</code></pre></td><td>247.17 ns</td><td>859.47 ns</td><td>263.46 ns</td><td><strong>254.39 ns</strong></td><td>257.52 ns</td><td>267.38 ns</td><td>1.00</td><td>858.61 μs</td>
</tr>

<tr>
    <td>3</td><td>If Else Multi return</td><td><pre lang="typescript"><code>

if (xxx)
  return a;
else if (yyyy)
  return b;

</code></pre></td><td>247.17 ns</td><td>728.71 ns</td><td>263.58 ns</td><td><strong>254.49 ns</strong></td><td>257.81 ns</td><td>266.89 ns</td><td>1.00</td><td>859.00 μs</td>
</tr>

</table>

## Set VS Regex VS In Object VS Object property (156 laps, 4096 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Object property</td><td><pre lang="typescript"><code>
if (obj['key']) { /* ... */ }
</code></pre></td><td>77.32 ns</td><td>1.11 μs</td><td>356.86 ns</td><td style="color:green"><strong>537.06 ns</strong></td><td>565.97 ns</td><td>581.20 ns</td><td>1.00</td><td>55.67 μs</td>
</tr>

<tr>
    <td>2</td><td>Object in</td><td><pre lang="typescript"><code>
if ('key' in obj) { /* ... */ }
</code></pre></td><td>78.15 ns</td><td>1.09 μs</td><td>357.39 ns</td><td><strong>540.33 ns</strong></td><td>565.87 ns</td><td>580.10 ns</td><td>1.00</td><td>55.75 μs</td>
</tr>

<tr>
    <td>3</td><td>Object hasOwnProperty</td><td><pre lang="typescript"><code>
if (obj.hasOwnProperty('key')) { /* ... */ }
</code></pre></td><td>3.62 μs</td><td>6.38 μs</td><td>3.98 μs</td><td><strong>4.03 μs</strong></td><td>4.08 μs</td><td>4.30 μs</td><td>7.37</td><td>620.52 μs</td>
</tr>

<tr>
    <td>4</td><td>Object.hasOwn</td><td><pre lang="typescript"><code>
if (Object.hasOwn(obj, 'key')) { /* ... */ }
</code></pre></td><td>4.50 μs</td><td>6.79 μs</td><td>4.92 μs</td><td><strong>4.96 μs</strong></td><td>5.01 μs</td><td>5.24 μs</td><td>9.03</td><td>767.69 μs</td>
</tr>

<tr>
    <td>5</td><td>Set</td><td><pre lang="typescript"><code>
const set = new Set([/* ... */]);
set.has('key')

</code></pre></td><td>4.70 μs</td><td>7.38 μs</td><td>5.18 μs</td><td><strong>5.14 μs</strong></td><td>5.23 μs</td><td>5.82 μs</td><td>9.61</td><td>808.27 μs</td>
</tr>

<tr>
    <td>6</td><td>RegExp</td><td><pre lang="typescript"><code>
const regex = /^(mul|div|sum|sub)$/;
regex.test('key')

</code></pre></td><td>7.99 μs</td><td>13.21 μs</td><td>8.99 μs</td><td><strong>8.99 μs</strong></td><td>9.19 μs</td><td>10.02 μs</td><td>16.74</td><td>1.40 ms</td>
</tr>

</table>

## Dynamic Function VS Arrow Function (13970 laps, 8 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Anonymous</td><td><pre lang="typescript"><code>

samples.filter(f => {
  return f > 3 && f < 9;
});

</code></pre></td><td>19.61 μs</td><td>45.82 ms</td><td>39.20 μs</td><td style="color:green"><strong>20.69 μs</strong></td><td>21.28 μs</td><td>24.11 μs</td><td>1.00</td><td>547.57 ms</td>
</tr>

<tr>
    <td>2</td><td>Function</td><td><pre lang="typescript"><code>

samples.filter(function (f) {
  return f > 3 && f < 9;
});

</code></pre></td><td>20.04 μs</td><td>9.83 ms</td><td>37.38 μs</td><td><strong>21.89 μs</strong></td><td>22.48 μs</td><td>25.49 μs</td><td>1.06</td><td>522.16 ms</td>
</tr>

</table>

## Declared Function VS Dynamic (6919 laps, 16 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Declared arrow function</td><td><pre lang="typescript"><code>
function declareFunctionFilter(f: number) {
        return f > 3 && f < 9;
      }
      // [...]
      samples.filter(declareFunctionFilter)
</code></pre></td><td>19.57 μs</td><td>72.72 ms</td><td>48.97 μs</td><td style="color:green"><strong>20.43 μs</strong></td><td>20.89 μs</td><td>23.47 μs</td><td>1.00</td><td>338.85 ms</td>
</tr>

<tr>
    <td>2</td><td>Declared function</td><td><pre lang="typescript"><code>
const declareFilter = (f: number) => {
        return f > 3 && f < 9;
      };
      // [...]
      samples.filter(declareFunctionFilter)
</code></pre></td><td>19.46 μs</td><td>51.89 ms</td><td>45.88 μs</td><td><strong>20.47 μs</strong></td><td>20.93 μs</td><td>23.46 μs</td><td>1.00</td><td>317.47 ms</td>
</tr>

<tr>
    <td>3</td><td>Dynamic function</td><td><pre lang="typescript"><code>
samples.filter(function (f) {
        return f > 3 && f < 9;
      })
</code></pre></td><td>20.23 μs</td><td>1.47 ms</td><td>39.31 μs</td><td><strong>20.88 μs</strong></td><td>21.29 μs</td><td>23.69 μs</td><td>1.02</td><td>271.98 ms</td>
</tr>

</table>

## Compose a string with `+` (plus) or with `${}` (interpolation)? (2240 laps, 512 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Plus operator</td><td><pre lang="typescript"><code>
'n°' + i + '\n';

</code></pre></td><td>1.32 μs</td><td>9.62 μs</td><td>2.03 μs</td><td style="color:green"><strong>1.37 μs</strong></td><td>2.61 μs</td><td>3.57 μs</td><td>1.00</td><td>4.54 ms</td>
</tr>

<tr>
    <td>2</td><td>Interpolation</td><td><pre lang="typescript"><code>
`n°${i}\n`;

</code></pre></td><td>1.33 μs</td><td>7.93 μs</td><td>1.98 μs</td><td><strong>1.37 μs</strong></td><td>2.67 μs</td><td>3.63 μs</td><td>1.02</td><td>4.43 ms</td>
</tr>

</table>

## Async Function VS Function (1288 laps, 8192 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Not async function</td><td><pre lang="typescript"><code>
function notAsyncFunction(ctx: ILapContext) {
        return ctx.value || true;
      };
      
      notAsyncFunction(ctx);
</code></pre></td><td>8.01 ns</td><td>33.63 ns</td><td>12.91 ns</td><td style="color:green"><strong>12.70 ns</strong></td><td>12.85 ns</td><td>13.20 ns</td><td>1.00</td><td>16.62 μs</td>
</tr>

<tr>
    <td>2</td><td>Not async function (arrow)</td><td><pre lang="typescript"><code>
const notAsyncFunction = (ctx: ILapContext) => {
        return ctx.value || true;
      };
      
      notAsyncFunction(ctx);
</code></pre></td><td>7.34 ns</td><td>26.44 ns</td><td>12.91 ns</td><td><strong>12.73 ns</strong></td><td>12.88 ns</td><td>13.29 ns</td><td>1.00</td><td>16.63 μs</td>
</tr>

<tr>
    <td>3</td><td>Async function (arrow)</td><td><pre lang="typescript"><code>
const asyncFunction = async (ctx: ILapContext) => {
  return ctx.value || true;
};

await asyncFunction(ctx);
</code></pre></td><td>40.88 ns</td><td>344.12 ns</td><td>62.62 ns</td><td><strong>41.97 ns</strong></td><td>42.99 ns</td><td>170.51 ns</td><td>6.59</td><td>80.66 μs</td>
</tr>

<tr>
    <td>4</td><td>Async function</td><td><pre lang="typescript"><code>
async function asyncFunction(ctx: ILapContext) {
  return ctx.value || true;
};

await asyncFunction(ctx);
</code></pre></td><td>40.87 ns</td><td>578.32 ns</td><td>62.56 ns</td><td><strong>42.00 ns</strong></td><td>43.01 ns</td><td>165.69 ns</td><td>6.47</td><td>80.58 μs</td>
</tr>

<tr>
    <td>5</td><td>Promise function (arrow, without async keyword)</td><td><pre lang="typescript"><code>
function promiseFunction(ctx: ILapContext) {
  return Promise.resolve(ctx.value || true);
};

await promiseFunction(ctx);
</code></pre></td><td>43.54 ns</td><td>376.48 ns</td><td>66.39 ns</td><td><strong>44.74 ns</strong></td><td>45.96 ns</td><td>175.24 ns</td><td>6.86</td><td>85.51 μs</td>
</tr>

<tr>
    <td>6</td><td>Promise function (without async keyword)</td><td><pre lang="typescript"><code>
const promiseFunction = async (ctx: ILapContext) => {
        return Promise.resolve(ctx.value || true);
      };
      
      await promiseFunction(ctx);
</code></pre></td><td>43.64 ns</td><td>380.60 ns</td><td>65.26 ns</td><td><strong>44.78 ns</strong></td><td>45.91 ns</td><td>171.62 ns</td><td>6.77</td><td>84.05 μs</td>
</tr>

</table>

