# Benchmark Node.js v16.20.2

## Join array (5099 laps, 4096 samples per lap)

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

</code></pre></td><td>32.67 ns</td><td>148.10 ns</td><td>37.00 ns</td><td style="color:green"><strong>33.67 ns</strong></td><td>34.50 ns</td><td>43.07 ns</td><td>1.00</td><td>188.65 μs</td>
</tr>

<tr>
    <td>2</td><td>String.concat</td><td><pre lang="typescript"><code>

str = ''.concat(... samples);

</code></pre></td><td>40.48 ns</td><td>309.91 ns</td><td>45.68 ns</td><td><strong>42.21 ns</strong></td><td>43.12 ns</td><td>53.30 ns</td><td>1.25</td><td>232.91 μs</td>
</tr>

<tr>
    <td>3</td><td>for +=</td><td><pre lang="typescript"><code>

str = samples[0];
for (let i = 1; i < samples.length; i++) {
  str += samples[i];
}

</code></pre></td><td>52.34 ns</td><td>154.39 ns</td><td>57.91 ns</td><td><strong>54.05 ns</strong></td><td>55.35 ns</td><td>68.80 ns</td><td>1.60</td><td>295.27 μs</td>
</tr>

<tr>
    <td>4</td><td>samples.join()</td><td><pre lang="typescript"><code>

str = samples.join();

</code></pre></td><td>542.85 ns</td><td>1.24 μs</td><td>686.28 ns</td><td><strong>677.17 ns</strong></td><td>695.24 ns</td><td>720.51 ns</td><td>18.82</td><td>3.50 ms</td>
</tr>

</table>

## Sopmethig (11376 laps, 512 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>for let str+=</td><td><pre lang="typescript"><code>
interpolation, slice, join';

</code></pre></td><td>39.65 ns</td><td>2.43 μs</td><td>546.39 ns</td><td style="color:green"><strong>600.78 ns</strong></td><td>805.86 ns</td><td>952.34 ns</td><td>1.00</td><td>6.22 ms</td>
</tr>

<tr>
    <td>2</td><td>reduce</td><td><pre lang="typescript"><code>
reduce';

</code></pre></td><td>40.82 ns</td><td>1.97 μs</td><td>550.20 ns</td><td><strong>602.93 ns</strong></td><td>808.20 ns</td><td>951.17 ns</td><td>1.00</td><td>6.26 ms</td>
</tr>

<tr>
    <td>3</td><td>iterator keys()</td><td><pre lang="typescript"><code>
iterator';

</code></pre></td><td>46.68 ns</td><td>1.86 μs</td><td>564.99 ns</td><td><strong>615.82 ns</strong></td><td>833.20 ns</td><td>982.23 ns</td><td>1.03</td><td>6.43 ms</td>
</tr>

<tr>
    <td>4</td><td>Slice Join</td><td><pre lang="typescript"><code>
interpolation, slice, join';

</code></pre></td><td>60.55 ns</td><td>1.89 μs</td><td>607.89 ns</td><td><strong>666.41 ns</strong></td><td>890.23 ns</td><td>1.02 μs</td><td>1.09</td><td>6.92 ms</td>
</tr>

</table>

## War of Loop (12360 laps, 8192 samples per lap)

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

</code></pre></td><td>11.43 ns</td><td>58.70 ns</td><td>16.32 ns</td><td style="color:green"><strong>15.98 ns</strong></td><td>16.24 ns</td><td>16.82 ns</td><td>1.00</td><td>201.67 μs</td>
</tr>

<tr>
    <td>2</td><td>for i</td><td><pre lang="typescript"><code>

for (let i = 0; i < samples.length; i++) {
  // [...]
}

</code></pre></td><td>10.35 ns</td><td>57.90 ns</td><td>16.44 ns</td><td><strong>16.04 ns</strong></td><td>16.41 ns</td><td>17.31 ns</td><td>1.01</td><td>203.15 μs</td>
</tr>

<tr>
    <td>3</td><td>for i (len outside)</td><td><pre lang="typescript"><code>

const len = samples.length;
for (let i = 0; i < len; i++) {
  // [...]
}

</code></pre></td><td>11.44 ns</td><td>59.97 ns</td><td>16.36 ns</td><td><strong>16.04 ns</strong></td><td>16.25 ns</td><td>16.69 ns</td><td>1.00</td><td>202.27 μs</td>
</tr>

<tr>
    <td>4</td><td>forEach</td><td><pre lang="typescript"><code>

samples.forEach(val => {
  // [...]
});

</code></pre></td><td>15.08 ns</td><td>58.51 ns</td><td>20.27 ns</td><td><strong>19.60 ns</strong></td><td>21.06 ns</td><td>21.48 ns</td><td>1.27</td><td>250.58 μs</td>
</tr>

<tr>
    <td>5</td><td>for of</td><td><pre lang="typescript"><code>

for (const val of samples) {
  // [...]
}

</code></pre></td><td>16.02 ns</td><td>48.35 ns</td><td>20.54 ns</td><td><strong>20.18 ns</strong></td><td>20.40 ns</td><td>20.80 ns</td><td>1.25</td><td>253.93 μs</td>
</tr>

</table>

## War of Sort (7975 laps, 32 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Merge sort</td><td><pre lang="typescript"><code>

      mergeSort(samples.slice(0));

</code></pre></td><td>3.17 μs</td><td>37.56 μs</td><td>3.60 μs</td><td style="color:green"><strong>3.30 μs</strong></td><td>3.35 μs</td><td>4.21 μs</td><td>1.00</td><td>28.68 ms</td>
</tr>

<tr>
    <td>2</td><td>sort</td><td><pre lang="typescript"><code>

      samples.slice(0).sort((a, b) => (b.name < a.name ? 1 : -1));

</code></pre></td><td>3.29 μs</td><td>13.98 μs</td><td>3.59 μs</td><td><strong>3.47 μs</strong></td><td>3.53 μs</td><td>3.67 μs</td><td>0.98</td><td>28.62 ms</td>
</tr>

</table>

## Loop Key,Value from an object (8364 laps, 1024 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>for in</td><td><pre lang="typescript"><code>

for (const key in samples) {
  // ...
}

</code></pre></td><td>283.30 ns</td><td>909.57 ns</td><td>311.17 ns</td><td style="color:green"><strong>292.77 ns</strong></td><td>298.73 ns</td><td>372.95 ns</td><td>1.00</td><td>2.60 ms</td>
</tr>

<tr>
    <td>2</td><td>for of Object.entries()</td><td><pre lang="typescript"><code>

for (const [key, value] of Object.entries(samples)) {
  // ...
}

</code></pre></td><td>376.86 ns</td><td>1.04 μs</td><td>418.11 ns</td><td><strong>390.63 ns</strong></td><td>402.25 ns</td><td>506.25 ns</td><td>1.35</td><td>3.50 ms</td>
</tr>

<tr>
    <td>3</td><td>Object.keys() + for i</td><td><pre lang="typescript"><code>

const keys = Object.keys(samples);
for (let i = 0; i < keys.length; i++) {
  // ...
}

</code></pre></td><td>377.44 ns</td><td>1.09 μs</td><td>414.26 ns</td><td><strong>392.48 ns</strong></td><td>401.37 ns</td><td>488.57 ns</td><td>1.33</td><td>3.46 ms</td>
</tr>

<tr>
    <td>4</td><td>Object.keys().forEach</td><td><pre lang="typescript"><code>

Object.keys(samples).forEach(key => {
  // ...
});

</code></pre></td><td>389.26 ns</td><td>1.27 μs</td><td>425.55 ns</td><td><strong>403.42 ns</strong></td><td>412.11 ns</td><td>502.34 ns</td><td>1.37</td><td>3.56 ms</td>
</tr>

<tr>
    <td>5</td><td>for of Object.keys()</td><td><pre lang="typescript"><code>

for (const key of Object.keys(samples)) {
  // ...
}

</code></pre></td><td>390.14 ns</td><td>1.21 μs</td><td>427.14 ns</td><td><strong>403.81 ns</strong></td><td>412.79 ns</td><td>505.47 ns</td><td>1.37</td><td>3.57 ms</td>
</tr>

</table>

## Declare in loop or not (206 laps, 256 samples per lap)

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

</code></pre></td><td>1.96 μs</td><td>2.98 μs</td><td>2.04 μs</td><td style="color:green"><strong>2.01 μs</strong></td><td>2.05 μs</td><td>2.10 μs</td><td>1.00</td><td>420.77 μs</td>
</tr>

<tr>
    <td>2</td><td>let out loop</td><td><pre lang="typescript"><code>

const map = new Map<number, number>();
let myVarOutLoop: number;
for (let i = 0; i < 100; i++) {
  myVarOutLoop = i * 5;
  map.set(i, myVarOutLoop);
}

</code></pre></td><td>1.97 μs</td><td>3.56 μs</td><td>2.07 μs</td><td><strong>2.03 μs</strong></td><td>2.07 μs</td><td>2.17 μs</td><td>1.02</td><td>426.98 μs</td>
</tr>

<tr>
    <td>3</td><td>const in loop</td><td><pre lang="typescript"><code>

const map = new Map<number, number>();
for (let i = 0; i < 10000; i++) {
  const myVarInLoop = i * 5;
  map.set(i, myVarInLoop);
}

</code></pre></td><td>506.90 μs</td><td>597.43 μs</td><td>547.20 μs</td><td><strong>548.51 μs</strong></td><td>556.56 μs</td><td>565.45 μs</td><td>271.35</td><td>112.72 ms</td>
</tr>

</table>

## Join a string with an array or with +=? (7847 laps, 64 samples per lap)

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

</code></pre></td><td>6.99 μs</td><td>23.99 μs</td><td>7.79 μs</td><td style="color:green"><strong>7.24 μs</strong></td><td>7.43 μs</td><td>9.70 μs</td><td>1.00</td><td>61.09 ms</td>
</tr>

<tr>
    <td>2</td><td>array push join</td><td><pre lang="typescript"><code>

const strArray: string[] = [];
strArray.push('Hello');
strArray.push(' Mister');
const str = strArray.join();

</code></pre></td><td>22.53 μs</td><td>54.11 μs</td><td>25.96 μs</td><td><strong>25.17 μs</strong></td><td>26.42 μs</td><td>27.92 μs</td><td>3.26</td><td>203.69 ms</td>
</tr>

</table>

## (Get only, no set) Map VS Object VS switch VS if (7469 laps, 1024 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>If</td><td><pre lang="typescript"><code>
if (key === 'a') { return something }
</code></pre></td><td>223.24 ns</td><td>669.34 ns</td><td>238.04 ns</td><td style="color:green"><strong>231.93 ns</strong></td><td>235.45 ns</td><td>241.50 ns</td><td>1.00</td><td>1.78 ms</td>
</tr>

<tr>
    <td>2</td><td>Switch</td><td><pre lang="typescript"><code>
switch (key)
</code></pre></td><td>225.39 ns</td><td>671.68 ns</td><td>242.73 ns</td><td><strong>236.62 ns</strong></td><td>240.04 ns</td><td>246.19 ns</td><td>1.02</td><td>1.81 ms</td>
</tr>

<tr>
    <td>3</td><td>Object</td><td><pre lang="typescript"><code>
obj[key]
</code></pre></td><td>290.72 ns</td><td>867.38 ns</td><td>308.69 ns</td><td><strong>299.12 ns</strong></td><td>303.91 ns</td><td>316.02 ns</td><td>1.30</td><td>2.31 ms</td>
</tr>

<tr>
    <td>4</td><td>Map</td><td><pre lang="typescript"><code>
map.get(key)
</code></pre></td><td>303.52 ns</td><td>1.10 μs</td><td>323.74 ns</td><td><strong>313.67 ns</strong></td><td>318.85 ns</td><td>330.76 ns</td><td>1.36</td><td>2.42 ms</td>
</tr>

</table>

## [Set/Get] Map VS Object (968 laps, 8192 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Object (numeric key)</td><td><pre lang="typescript"><code>
obj[1234] = value;
return obj[1234];

</code></pre></td><td>14.01 ns</td><td>34.13 ns</td><td>19.11 ns</td><td style="color:green"><strong>18.75 ns</strong></td><td>18.98 ns</td><td>19.52 ns</td><td>1.00</td><td>18.50 μs</td>
</tr>

<tr>
    <td>2</td><td>Object (small key)</td><td><pre lang="typescript"><code>
obj['1234'] = value;
return obj['1234'];

</code></pre></td><td>19.56 ns</td><td>64.70 ns</td><td>24.37 ns</td><td><strong>23.94 ns</strong></td><td>24.27 ns</td><td>24.67 ns</td><td>1.27</td><td>23.59 μs</td>
</tr>

<tr>
    <td>3</td><td>Map (numeric key)</td><td><pre lang="typescript"><code>
map.set(1234, value);
return map.get(1234);

</code></pre></td><td>18.43 ns</td><td>45.78 ns</td><td>24.35 ns</td><td><strong>23.99 ns</strong></td><td>26.57 ns</td><td>29.27 ns</td><td>1.39</td><td>23.57 μs</td>
</tr>

<tr>
    <td>4</td><td>Map (small key)</td><td><pre lang="typescript"><code>
map.set('1234', value);
return map.get('1234');

</code></pre></td><td>22.53 ns</td><td>68.86 ns</td><td>33.14 ns</td><td><strong>32.56 ns</strong></td><td>33.24 ns</td><td>34.52 ns</td><td>1.75</td><td>32.08 μs</td>
</tr>

<tr>
    <td>5</td><td>Object (symbol key)</td><td><pre lang="typescript"><code>
obj[Symbol.for(abcdef)] = value;
return obj[Symbol.for(abcdef)];

</code></pre></td><td>79.47 ns</td><td>185.58 ns</td><td>90.77 ns</td><td><strong>88.89 ns</strong></td><td>90.34 ns</td><td>93.40 ns</td><td>4.76</td><td>87.87 μs</td>
</tr>

<tr>
    <td>6</td><td>Map (symbol key)</td><td><pre lang="typescript"><code>
map.set(Symbol.for('abcdef'), value);
return map.get(Symbol.for('abcdef'));

</code></pre></td><td>86.41 ns</td><td>171.69 ns</td><td>98.48 ns</td><td><strong>96.63 ns</strong></td><td>101.34 ns</td><td>106.56 ns</td><td>5.32</td><td>95.33 μs</td>
</tr>

<tr>
    <td>7</td><td>Object</td><td><pre lang="typescript"><code>
obj['keywithalenght'] = value;
return obj['keywithalenght'];

</code></pre></td><td>65.00 ns</td><td>202.93 ns</td><td>114.35 ns</td><td><strong>117.10 ns</strong></td><td>118.92 ns</td><td>122.55 ns</td><td>6.26</td><td>110.69 μs</td>
</tr>

<tr>
    <td>8</td><td>Object (very long key)</td><td><pre lang="typescript"><code>
obj['1234'] = value;
return obj['1234'];

</code></pre></td><td>148.97 ns</td><td>262.51 ns</td><td>158.43 ns</td><td><strong>155.73 ns</strong></td><td>158.45 ns</td><td>163.75 ns</td><td>8.35</td><td>153.36 μs</td>
</tr>

<tr>
    <td>9</td><td>Map</td><td><pre lang="typescript"><code>
map.set('keywithalenght', value);
return map.get('keywithalenght');

</code></pre></td><td>64.45 ns</td><td>335.02 ns</td><td>186.15 ns</td><td><strong>194.70 ns</strong></td><td>202.15 ns</td><td>215.76 ns</td><td>10.70</td><td>180.20 μs</td>
</tr>

<tr>
    <td>10</td><td>Map (very long key)</td><td><pre lang="typescript"><code>
map.set('something-else-everyon-ok-super-ultra', value);
return map.get('something-else-everyon-ok-super-ultra');

</code></pre></td><td>214.92 ns</td><td>395.54 ns</td><td>238.63 ns</td><td><strong>232.90 ns</strong></td><td>245.48 ns</td><td>264.27 ns</td><td>12.97</td><td>230.99 μs</td>
</tr>

</table>

## If Else Return? (10338 laps, 1024 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>If Multi return</td><td><pre lang="typescript"><code>

if (xxx)
  return a;
if (yyyy)
  return b;

</code></pre></td><td>225.98 ns</td><td>924.61 ns</td><td>248.76 ns</td><td style="color:green"><strong>235.06 ns</strong></td><td>238.77 ns</td><td>286.23 ns</td><td>1.00</td><td>2.57 ms</td>
</tr>

<tr>
    <td>2</td><td>If Else Multi return</td><td><pre lang="typescript"><code>

if (xxx)
  return a;
else if (yyyy)
  return b;

</code></pre></td><td>223.14 ns</td><td>945.80 ns</td><td>249.03 ns</td><td><strong>235.35 ns</strong></td><td>239.06 ns</td><td>284.28 ns</td><td>1.00</td><td>2.57 ms</td>
</tr>

<tr>
    <td>3</td><td>If Else One return</td><td><pre lang="typescript"><code>

let result;
if (xxx)
  result = a;
else if (yyyy)
  result = b;

return result;

</code></pre></td><td>226.07 ns</td><td>1.41 μs</td><td>249.03 ns</td><td><strong>235.45 ns</strong></td><td>239.06 ns</td><td>282.71 ns</td><td>1.00</td><td>2.57 ms</td>
</tr>

</table>

## Set VS Regex VS In Object VS Object property (333 laps, 4096 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Object in</td><td><pre lang="typescript"><code>
if ('key' in obj) { /* ... */ }
</code></pre></td><td>76.39 ns</td><td>1.00 μs</td><td>476.63 ns</td><td style="color:green"><strong>539.94 ns</strong></td><td>586.52 ns</td><td>615.63 ns</td><td>1.00</td><td>158.72 μs</td>
</tr>

<tr>
    <td>2</td><td>Object property</td><td><pre lang="typescript"><code>
if (obj['key']) { /* ... */ }
</code></pre></td><td>75.90 ns</td><td>1.26 μs</td><td>475.81 ns</td><td><strong>541.99 ns</strong></td><td>576.76 ns</td><td>607.10 ns</td><td>0.99</td><td>158.44 μs</td>
</tr>

<tr>
    <td>3</td><td>Object hasOwnProperty</td><td><pre lang="typescript"><code>
if (obj.hasOwnProperty('key')) { /* ... */ }
</code></pre></td><td>3.40 μs</td><td>8.75 μs</td><td>4.00 μs</td><td><strong>3.92 μs</strong></td><td>3.99 μs</td><td>4.07 μs</td><td>6.88</td><td>1.33 ms</td>
</tr>

<tr>
    <td>4</td><td>Set</td><td><pre lang="typescript"><code>
const set = new Set([/* ... */]);
set.has('key')

</code></pre></td><td>4.24 μs</td><td>10.86 μs</td><td>4.80 μs</td><td><strong>4.73 μs</strong></td><td>4.79 μs</td><td>4.89 μs</td><td>8.27</td><td>1.60 ms</td>
</tr>

<tr>
    <td>5</td><td>Object.hasOwn</td><td><pre lang="typescript"><code>
if (Object.hasOwn(obj, 'key')) { /* ... */ }
</code></pre></td><td>4.28 μs</td><td>11.24 μs</td><td>4.99 μs</td><td><strong>4.90 μs</strong></td><td>4.97 μs</td><td>5.07 μs</td><td>8.57</td><td>1.66 ms</td>
</tr>

<tr>
    <td>6</td><td>RegExp</td><td><pre lang="typescript"><code>
const regex = /^(mul|div|sum|sub)$/;
regex.test('key')

</code></pre></td><td>7.92 μs</td><td>17.37 μs</td><td>8.72 μs</td><td><strong>8.52 μs</strong></td><td>8.62 μs</td><td>8.85 μs</td><td>14.92</td><td>2.90 ms</td>
</tr>

</table>

## Workers War (51 laps, 8 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>One Worker Eval</td><td><pre lang="typescript"><code>

const worker = new Worker('code'); each time worker.send

</code></pre></td><td>25.14 μs</td><td>82.36 μs</td><td>34.30 μs</td><td style="color:green"><strong>30.84 μs</strong></td><td>38.04 μs</td><td>41.07 μs</td><td>1.00</td><td>1.75 ms</td>
</tr>

<tr>
    <td>2</td><td>One Worker</td><td><pre lang="typescript"><code>

const worker = new Worker(); each time worker.send

</code></pre></td><td>29.28 μs</td><td>68.60 μs</td><td>39.48 μs</td><td><strong>36.62 μs</strong></td><td>41.85 μs</td><td>52.36 μs</td><td>1.19</td><td>2.01 ms</td>
</tr>

<tr>
    <td>3</td><td>new Worker Eval</td><td><pre lang="typescript"><code>

    new Worker('code') each time
    
</code></pre></td><td>33.90 ms</td><td>36.03 ms</td><td>34.76 ms</td><td><strong>34.66 ms</strong></td><td>35.14 ms</td><td>35.49 ms</td><td>957.60</td><td>1.77 sec.</td>
</tr>

<tr>
    <td>4</td><td>new Worker</td><td><pre lang="typescript"><code>

    new Worker() each time
    
</code></pre></td><td>36.49 ms</td><td>41.18 ms</td><td>37.50 ms</td><td><strong>37.31 ms</strong></td><td>37.80 ms</td><td>38.06 ms</td><td>1029.33</td><td>1.91 sec.</td>
</tr>

</table>

## Dynamic Function VS Arrow Function (24836 laps, 8 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Anonymous</td><td><pre lang="typescript"><code>

samples.filter(f => {
  return f > 3 && f < 9;
});

</code></pre></td><td>20.84 μs</td><td>87.70 μs</td><td>22.52 μs</td><td style="color:green"><strong>21.61 μs</strong></td><td>21.84 μs</td><td>23.20 μs</td><td>1.00</td><td>559.21 ms</td>
</tr>

<tr>
    <td>2</td><td>Function</td><td><pre lang="typescript"><code>

samples.filter(function (f) {
  return f > 3 && f < 9;
});

</code></pre></td><td>21.21 μs</td><td>191.15 μs</td><td>22.92 μs</td><td><strong>21.96 μs</strong></td><td>22.25 μs</td><td>23.52 μs</td><td>1.02</td><td>569.18 ms</td>
</tr>

</table>

## Declared Function VS Dynamic (14439 laps, 16 samples per lap)

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
</code></pre></td><td>20.16 μs</td><td>109.15 μs</td><td>22.11 μs</td><td style="color:green"><strong>20.94 μs</strong></td><td>21.23 μs</td><td>22.88 μs</td><td>1.00</td><td>319.18 ms</td>
</tr>

<tr>
    <td>2</td><td>Declared function</td><td><pre lang="typescript"><code>
const declareFilter = (f: number) => {
        return f > 3 && f < 9;
      };
      // [...]
      samples.filter(declareFunctionFilter)
</code></pre></td><td>20.21 μs</td><td>136.16 μs</td><td>22.39 μs</td><td><strong>21.28 μs</strong></td><td>21.60 μs</td><td>23.41 μs</td><td>1.02</td><td>323.31 ms</td>
</tr>

<tr>
    <td>3</td><td>Dynamic function</td><td><pre lang="typescript"><code>
samples.filter(function (f) {
        return f > 3 && f < 9;
      })
</code></pre></td><td>20.42 μs</td><td>173.62 μs</td><td>22.70 μs</td><td><strong>21.56 μs</strong></td><td>21.86 μs</td><td>23.90 μs</td><td>1.03</td><td>327.75 ms</td>
</tr>

</table>

## Compose a string with `+` (plus) or with `${}` (interpolation)? (23187 laps, 32 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Interpolation</td><td><pre lang="typescript"><code>
`n°${i}\n`;

</code></pre></td><td>1.33 μs</td><td>31.49 μs</td><td>1.64 μs</td><td style="color:green"><strong>1.38 μs</strong></td><td>1.42 μs</td><td>2.52 μs</td><td>1.00</td><td>38.00 ms</td>
</tr>

<tr>
    <td>2</td><td>Plus operator</td><td><pre lang="typescript"><code>
'n°' + i + '\n';

</code></pre></td><td>1.33 μs</td><td>43.75 μs</td><td>1.64 μs</td><td><strong>1.38 μs</strong></td><td>1.42 μs</td><td>2.53 μs</td><td>1.00</td><td>38.09 ms</td>
</tr>

</table>

## Async Function VS Function (2610 laps, 8192 samples per lap)

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
</code></pre></td><td>7.96 ns</td><td>30.02 ns</td><td>12.78 ns</td><td style="color:green"><strong>12.60 ns</strong></td><td>12.71 ns</td><td>12.98 ns</td><td>1.00</td><td>33.36 μs</td>
</tr>

<tr>
    <td>2</td><td>Not async function (arrow)</td><td><pre lang="typescript"><code>
const notAsyncFunction = (ctx: ILapContext) => {
        return ctx.value || true;
      };
      
      notAsyncFunction(ctx);
</code></pre></td><td>7.98 ns</td><td>31.67 ns</td><td>12.79 ns</td><td><strong>12.61 ns</strong></td><td>12.72 ns</td><td>12.99 ns</td><td>1.00</td><td>33.39 μs</td>
</tr>

<tr>
    <td>3</td><td>Async function (arrow)</td><td><pre lang="typescript"><code>
const asyncFunction = async (ctx: ILapContext) => {
  return ctx.value || true;
};

await asyncFunction(ctx);
</code></pre></td><td>40.33 ns</td><td>161.61 ns</td><td>44.55 ns</td><td><strong>41.83 ns</strong></td><td>43.01 ns</td><td>55.59 ns</td><td>3.67</td><td>116.27 μs</td>
</tr>

<tr>
    <td>4</td><td>Async function</td><td><pre lang="typescript"><code>
async function asyncFunction(ctx: ILapContext) {
  return ctx.value || true;
};

await asyncFunction(ctx);
</code></pre></td><td>40.58 ns</td><td>119.04 ns</td><td>44.66 ns</td><td><strong>42.02 ns</strong></td><td>43.21 ns</td><td>55.69 ns</td><td>3.68</td><td>116.57 μs</td>
</tr>

<tr>
    <td>5</td><td>Promise function (arrow, without async keyword)</td><td><pre lang="typescript"><code>
function promiseFunction(ctx: ILapContext) {
  return Promise.resolve(ctx.value || true);
};

await promiseFunction(ctx);
</code></pre></td><td>42.94 ns</td><td>112.63 ns</td><td>47.23 ns</td><td><strong>44.56 ns</strong></td><td>45.75 ns</td><td>58.35 ns</td><td>3.88</td><td>123.28 μs</td>
</tr>

<tr>
    <td>6</td><td>Promise function (without async keyword)</td><td><pre lang="typescript"><code>
const promiseFunction = async (ctx: ILapContext) => {
        return Promise.resolve(ctx.value || true);
      };
      
      await promiseFunction(ctx);
</code></pre></td><td>45.10 ns</td><td>96.46 ns</td><td>51.20 ns</td><td><strong>48.71 ns</strong></td><td>49.94 ns</td><td>62.21 ns</td><td>4.20</td><td>133.63 μs</td>
</tr>

</table>

## Date.now() VS new Date().getTime() (18379 laps, 4096 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Date.now()</td><td><pre lang="typescript"><code>

time = Date.now();

</code></pre></td><td>56.71 ns</td><td>299.58 ns</td><td>59.65 ns</td><td style="color:green"><strong>58.23 ns</strong></td><td>59.06 ns</td><td>60.84 ns</td><td>1.00</td><td>1.10 ms</td>
</tr>

<tr>
    <td>2</td><td>new Date().getTime()</td><td><pre lang="typescript"><code>

time = new Date().getTime();

</code></pre></td><td>103.15 ns</td><td>522.75 ns</td><td>111.30 ns</td><td><strong>108.03 ns</strong></td><td>109.74 ns</td><td>115.92 ns</td><td>1.87</td><td>2.05 ms</td>
</tr>

</table>

## new Object() vs Curly braces ({}) (2796 laps, 1 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>new object()</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, new object());
}

</code></pre></td><td>464.40 μs</td><td>5.41 ms</td><td>725.03 μs</td><td style="color:green"><strong>539.00 μs</strong></td><td>566.20 μs</td><td>797.00 μs</td><td>1.00</td><td>2.03 sec.</td>
</tr>

<tr>
    <td>2</td><td>Curly braces {}</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, {});
}

</code></pre></td><td>466.10 μs</td><td>6.49 ms</td><td>707.30 μs</td><td><strong>542.40 μs</strong></td><td>566.40 μs</td><td>726.70 μs</td><td>0.96</td><td>1.98 sec.</td>
</tr>

<tr>
    <td>3</td><td>Object.create({})</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, Object.create());
}

</code></pre></td><td>3.41 ms</td><td>21.09 ms</td><td>4.58 ms</td><td><strong>3.78 ms</strong></td><td>5.48 ms</td><td>6.23 ms</td><td>8.14</td><td>12.79 sec.</td>
</tr>

</table>

## alphanum fight (191 laps, 1 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>checkString dumb</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, {});
}

</code></pre></td><td>18.45 ms</td><td>38.03 ms</td><td>23.11 ms</td><td style="color:green"><strong>20.46 ms</strong></td><td>28.52 ms</td><td>30.50 ms</td><td>1.00</td><td>4.41 sec.</td>
</tr>

<tr>
    <td>2</td><td>/^[a-z0-9]+$/gi</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, Object.create());
}

</code></pre></td><td>18.29 ms</td><td>67.58 ms</td><td>23.46 ms</td><td><strong>20.53 ms</strong></td><td>28.29 ms</td><td>31.30 ms</td><td>1.01</td><td>4.48 sec.</td>
</tr>

<tr>
    <td>3</td><td>/^[a-zA-Z0-9]+$/g</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
const regex = /[a-zA-Z0-9]/g;
for (let i = 0; i < 10000; i++) {
  map.set(i, regex.test(crypto.randomBytes(20).toString('hex')));
}
return map;

</code></pre></td><td>18.40 ms</td><td>44.44 ms</td><td>23.32 ms</td><td><strong>20.59 ms</strong></td><td>28.54 ms</td><td>30.32 ms</td><td>1.00</td><td>4.45 sec.</td>
</tr>

<tr>
    <td>4</td><td>checkString if</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, {});
}

</code></pre></td><td>19.25 ms</td><td>65.71 ms</td><td>23.81 ms</td><td><strong>21.22 ms</strong></td><td>29.05 ms</td><td>30.93 ms</td><td>1.02</td><td>4.55 sec.</td>
</tr>

<tr>
    <td>5</td><td>checkString Object</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, {});
}

</code></pre></td><td>23.77 ms</td><td>67.79 ms</td><td>28.61 ms</td><td><strong>26.04 ms</strong></td><td>33.59 ms</td><td>35.76 ms</td><td>1.20</td><td>5.46 sec.</td>
</tr>

</table>

## Cost of try catch (37 laps, 8192 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Without try/catch</td><td><pre lang="typescript"><code>

for (let i = 0; i < samples.length; i++) {
  // Without try catch
}

</code></pre></td><td>10.50 ns</td><td>22.66 ns</td><td>15.38 ns</td><td style="color:green"><strong>16.03 ns</strong></td><td>16.31 ns</td><td>17.97 ns</td><td>1.00</td><td>569.07 ns</td>
</tr>

<tr>
    <td>2</td><td>With try/catch</td><td><pre lang="typescript"><code>

for (let i = 0; i < samples.length; i++) {
  try {
    //
  } catch {
    //
  }
}

</code></pre></td><td>11.01 ns</td><td>25.83 ns</td><td>16.20 ns</td><td><strong>16.38 ns</strong></td><td>16.54 ns</td><td>16.78 ns</td><td>0.99</td><td>599.55 ns</td>
</tr>

<tr>
    <td>3</td><td>With try/catch/finally</td><td><pre lang="typescript"><code>

for (let i = 0; i < samples.length; i++) {
  try {
    //
  } catch {
    //
  } finally {
    //
  }
}

</code></pre></td><td>15.17 ns</td><td>32.68 ns</td><td>19.42 ns</td><td><strong>19.07 ns</strong></td><td>19.41 ns</td><td>20.64 ns</td><td>1.18</td><td>718.46 ns</td>
</tr>

<tr>
    <td>4</td><td>With try/catch/finally and throw error</td><td><pre lang="typescript"><code>

for (let i = 0; i < samples.length; i++) {
  try {
    //
  } catch (error) {
    //
  } finally {
    //
  }
}

</code></pre></td><td>26.71 μs</td><td>123.08 μs</td><td>98.78 μs</td><td><strong>102.15 μs</strong></td><td>102.40 μs</td><td>103.04 μs</td><td>6114.40</td><td>3.65 ms</td>
</tr>

<tr>
    <td>5</td><td>With try/catch and throw error</td><td><pre lang="typescript"><code>

for (let i = 0; i < samples.length; i++) {
  try {
    //
  } catch (error) {
    //
  }
}

</code></pre></td><td>33.23 μs</td><td>156.68 μs</td><td>122.87 μs</td><td><strong>127.21 μs</strong></td><td>127.60 μs</td><td>128.14 μs</td><td>7612.58</td><td>4.55 ms</td>
</tr>

</table>

