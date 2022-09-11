# Benchmark Node.js v16.17.0

## Join array (2405 laps, 4096 samples per lap)

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

</code></pre></td><td>33.03 ns</td><td>235.13 ns</td><td>37.93 ns</td><td style="color:green"><strong>34.11 ns</strong></td><td>34.89 ns</td><td>55.69 ns</td><td>1.00</td><td>91.22 μs</td>
</tr>

<tr>
    <td>2</td><td>String.concat</td><td><pre lang="typescript"><code>

str = ''.concat(... samples);

</code></pre></td><td>42.55 ns</td><td>124.41 ns</td><td>48.25 ns</td><td><strong>44.31 ns</strong></td><td>45.21 ns</td><td>67.97 ns</td><td>1.26</td><td>116.05 μs</td>
</tr>

<tr>
    <td>3</td><td>for +=</td><td><pre lang="typescript"><code>

str = samples[0];
for (let i = 1; i < samples.length; i++) {
  str += samples[i];
}

</code></pre></td><td>54.08 ns</td><td>435.94 ns</td><td>60.28 ns</td><td><strong>55.57 ns</strong></td><td>56.67 ns</td><td>79.86 ns</td><td>1.54</td><td>144.96 μs</td>
</tr>

<tr>
    <td>4</td><td>samples.join()</td><td><pre lang="typescript"><code>

str = samples.join();

</code></pre></td><td>568.53 ns</td><td>1.20 μs</td><td>655.29 ns</td><td><strong>641.67 ns</strong></td><td>654.20 ns</td><td>678.74 ns</td><td>15.84</td><td>1.58 ms</td>
</tr>

</table>

## War of Loop (7065 laps, 8192 samples per lap)

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

</code></pre></td><td>10.71 ns</td><td>39.90 ns</td><td>16.47 ns</td><td style="color:green"><strong>16.06 ns</strong></td><td>16.43 ns</td><td>17.04 ns</td><td>1.00</td><td>116.38 μs</td>
</tr>

<tr>
    <td>2</td><td>for i</td><td><pre lang="typescript"><code>

for (let i = 0; i < samples.length; i++) {
  // [...]
}

</code></pre></td><td>10.47 ns</td><td>35.17 ns</td><td>16.83 ns</td><td><strong>16.58 ns</strong></td><td>16.87 ns</td><td>17.31 ns</td><td>1.02</td><td>118.90 μs</td>
</tr>

<tr>
    <td>3</td><td>forEach</td><td><pre lang="typescript"><code>

samples.forEach(val => {
  // [...]
});

</code></pre></td><td>14.37 ns</td><td>43.25 ns</td><td>19.95 ns</td><td><strong>19.34 ns</strong></td><td>19.78 ns</td><td>21.35 ns</td><td>1.22</td><td>140.95 μs</td>
</tr>

<tr>
    <td>4</td><td>for of</td><td><pre lang="typescript"><code>

for (const val of samples) {
  // [...]
}

</code></pre></td><td>15.41 ns</td><td>42.41 ns</td><td>20.62 ns</td><td><strong>20.09 ns</strong></td><td>20.39 ns</td><td>20.83 ns</td><td>1.24</td><td>145.71 μs</td>
</tr>

</table>

## Loop Key,Value from an object (2287 laps, 2048 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>for in</td><td><pre lang="typescript"><code>

for (const key in samples) {
  // ...
}

</code></pre></td><td>293.65 ns</td><td>653.12 ns</td><td>315.64 ns</td><td style="color:green"><strong>300.24 ns</strong></td><td>306.98 ns</td><td>362.40 ns</td><td>1.00</td><td>721.87 μs</td>
</tr>

<tr>
    <td>2</td><td>for of Object.entries()</td><td><pre lang="typescript"><code>

for (const [key, value] of Object.entries(samples)) {
  // ...
}

</code></pre></td><td>385.21 ns</td><td>888.09 ns</td><td>416.66 ns</td><td><strong>394.43 ns</strong></td><td>441.26 ns</td><td>462.94 ns</td><td>1.34</td><td>952.90 μs</td>
</tr>

<tr>
    <td>3</td><td>Object.keys() + for i</td><td><pre lang="typescript"><code>

const keys = Object.keys(samples);
for (let i = 0; i < keys.length; i++) {
  // ...
}

</code></pre></td><td>396.88 ns</td><td>953.71 ns</td><td>426.80 ns</td><td><strong>407.47 ns</strong></td><td>416.55 ns</td><td>471.58 ns</td><td>1.34</td><td>976.10 μs</td>
</tr>

<tr>
    <td>4</td><td>Object.keys().forEach</td><td><pre lang="typescript"><code>

Object.keys(samples).forEach(key => {
  // ...
});

</code></pre></td><td>403.71 ns</td><td>1.19 μs</td><td>432.62 ns</td><td><strong>413.48 ns</strong></td><td>421.14 ns</td><td>477.29 ns</td><td>1.35</td><td>989.41 μs</td>
</tr>

<tr>
    <td>5</td><td>for of Object.keys()</td><td><pre lang="typescript"><code>

for (const key of Object.keys(samples)) {
  // ...
}

</code></pre></td><td>403.37 ns</td><td>888.87 ns</td><td>432.78 ns</td><td><strong>413.53 ns</strong></td><td>422.12 ns</td><td>480.32 ns</td><td>1.36</td><td>989.76 μs</td>
</tr>

</table>

## Declare in loop or not (115 laps, 256 samples per lap)

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

</code></pre></td><td>1.95 μs</td><td>3.78 μs</td><td>2.11 μs</td><td style="color:green"><strong>2.00 μs</strong></td><td>2.03 μs</td><td>2.56 μs</td><td>1.00</td><td>242.51 μs</td>
</tr>

<tr>
    <td>2</td><td>let out loop</td><td><pre lang="typescript"><code>

const map = new Map<number, number>();
let myVarOutLoop: number;
for (let i = 0; i < 100; i++) {
  myVarOutLoop = i * 5;
  map.set(i, myVarOutLoop);
}

</code></pre></td><td>1.96 μs</td><td>3.89 μs</td><td>2.10 μs</td><td><strong>2.01 μs</strong></td><td>2.04 μs</td><td>2.20 μs</td><td>0.95</td><td>241.89 μs</td>
</tr>

<tr>
    <td>3</td><td>const in loop</td><td><pre lang="typescript"><code>

const map = new Map<number, number>();
for (let i = 0; i < 10000; i++) {
  const myVarInLoop = i * 5;
  map.set(i, myVarInLoop);
}

</code></pre></td><td>493.19 μs</td><td>644.12 μs</td><td>539.33 μs</td><td><strong>539.54 μs</strong></td><td>562.05 μs</td><td>584.42 μs</td><td>256.00</td><td>62.02 ms</td>
</tr>

</table>

## Join a string with an array or with +=? (4859 laps, 64 samples per lap)

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

</code></pre></td><td>7.20 μs</td><td>18.17 μs</td><td>7.80 μs</td><td style="color:green"><strong>7.38 μs</strong></td><td>7.48 μs</td><td>9.84 μs</td><td>1.00</td><td>37.91 ms</td>
</tr>

<tr>
    <td>2</td><td>array push join</td><td><pre lang="typescript"><code>

const strArray: string[] = [];
strArray.push('Hello');
strArray.push(' Mister');
const str = strArray.join();

</code></pre></td><td>23.15 μs</td><td>44.47 μs</td><td>24.91 μs</td><td><strong>24.24 μs</strong></td><td>25.00 μs</td><td>26.66 μs</td><td>3.07</td><td>121.03 ms</td>
</tr>

</table>

## (Get only, no set) Map VS Object VS switch VS if (6718 laps, 512 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>If</td><td><pre lang="typescript"><code>
if (key === 'a') { return something }
</code></pre></td><td>244.34 ns</td><td>1.59 μs</td><td>262.62 ns</td><td style="color:green"><strong>252.93 ns</strong></td><td>256.84 ns</td><td>263.67 ns</td><td>1.00</td><td>1.76 ms</td>
</tr>

<tr>
    <td>2</td><td>Switch</td><td><pre lang="typescript"><code>
switch (key)
</code></pre></td><td>243.95 ns</td><td>1.25 μs</td><td>261.15 ns</td><td><strong>252.93 ns</strong></td><td>256.84 ns</td><td>263.48 ns</td><td>1.00</td><td>1.75 ms</td>
</tr>

<tr>
    <td>3</td><td>Map</td><td><pre lang="typescript"><code>
map.get(key)
</code></pre></td><td>311.91 ns</td><td>1.34 μs</td><td>335.24 ns</td><td><strong>321.29 ns</strong></td><td>326.76 ns</td><td>337.31 ns</td><td>1.27</td><td>2.25 ms</td>
</tr>

<tr>
    <td>4</td><td>Object</td><td><pre lang="typescript"><code>
obj[key]
</code></pre></td><td>319.53 ns</td><td>1.30 μs</td><td>343.45 ns</td><td><strong>330.47 ns</strong></td><td>336.13 ns</td><td>346.09 ns</td><td>1.31</td><td>2.31 ms</td>
</tr>

</table>

## [Set/Get] Map VS Object (500 laps, 8192 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Object (numeric key)</td><td><pre lang="typescript"><code>
obj[1234] = value;
return obj[1234];

</code></pre></td><td>13.60 ns</td><td>29.52 ns</td><td>18.36 ns</td><td style="color:green"><strong>18.13 ns</strong></td><td>18.32 ns</td><td>18.68 ns</td><td>1.00</td><td>9.18 μs</td>
</tr>

<tr>
    <td>2</td><td>Object (small key)</td><td><pre lang="typescript"><code>
obj['1234'] = value;
return obj['1234'];

</code></pre></td><td>18.92 ns</td><td>35.79 ns</td><td>23.88 ns</td><td><strong>23.58 ns</strong></td><td>23.85 ns</td><td>24.22 ns</td><td>1.30</td><td>11.94 μs</td>
</tr>

<tr>
    <td>3</td><td>Map (numeric key)</td><td><pre lang="typescript"><code>
map.set(1234, value);
return map.get(1234);

</code></pre></td><td>17.85 ns</td><td>56.25 ns</td><td>24.39 ns</td><td><strong>24.27 ns</strong></td><td>26.48 ns</td><td>29.36 ns</td><td>1.45</td><td>12.19 μs</td>
</tr>

<tr>
    <td>4</td><td>Map (small key)</td><td><pre lang="typescript"><code>
map.set('1234', value);
return map.get('1234');

</code></pre></td><td>22.23 ns</td><td>57.93 ns</td><td>35.94 ns</td><td><strong>36.02 ns</strong></td><td>36.60 ns</td><td>37.30 ns</td><td>1.99</td><td>17.97 μs</td>
</tr>

<tr>
    <td>5</td><td>Object (symbol key)</td><td><pre lang="typescript"><code>
obj[Symbol.for(abcdef)] = value;
return obj[Symbol.for(abcdef)];

</code></pre></td><td>86.68 ns</td><td>154.49 ns</td><td>91.58 ns</td><td><strong>90.47 ns</strong></td><td>91.75 ns</td><td>93.52 ns</td><td>5.00</td><td>45.79 μs</td>
</tr>

<tr>
    <td>6</td><td>Map (symbol key)</td><td><pre lang="typescript"><code>
map.set(Symbol.for('abcdef'), value);
return map.get(Symbol.for('abcdef'));

</code></pre></td><td>92.83 ns</td><td>166.83 ns</td><td>102.99 ns</td><td><strong>101.49 ns</strong></td><td>103.88 ns</td><td>108.23 ns</td><td>5.69</td><td>51.50 μs</td>
</tr>

<tr>
    <td>7</td><td>Object</td><td><pre lang="typescript"><code>
obj['keywithalenght'] = value;
return obj['keywithalenght'];

</code></pre></td><td>64.27 ns</td><td>199.71 ns</td><td>112.77 ns</td><td><strong>119.79 ns</strong></td><td>121.14 ns</td><td>123.58 ns</td><td>6.61</td><td>56.38 μs</td>
</tr>

<tr>
    <td>8</td><td>Object (very long key)</td><td><pre lang="typescript"><code>
obj['1234'] = value;
return obj['1234'];

</code></pre></td><td>153.77 ns</td><td>236.25 ns</td><td>162.71 ns</td><td><strong>161.02 ns</strong></td><td>163.04 ns</td><td>165.77 ns</td><td>8.89</td><td>81.35 μs</td>
</tr>

<tr>
    <td>9</td><td>Map</td><td><pre lang="typescript"><code>
map.set('keywithalenght', value);
return map.get('keywithalenght');

</code></pre></td><td>68.60 ns</td><td>394.19 ns</td><td>191.53 ns</td><td><strong>211.62 ns</strong></td><td>218.93 ns</td><td>240.00 ns</td><td>12.16</td><td>95.76 μs</td>
</tr>

<tr>
    <td>10</td><td>Map (very long key)</td><td><pre lang="typescript"><code>
map.set('something-else-everyon-ok-super-ultra', value);
return map.get('something-else-everyon-ok-super-ultra');

</code></pre></td><td>232.85 ns</td><td>393.09 ns</td><td>264.32 ns</td><td><strong>255.04 ns</strong></td><td>266.89 ns</td><td>306.23 ns</td><td>15.02</td><td>132.16 μs</td>
</tr>

</table>

## If Else Return? (4571 laps, 1024 samples per lap)

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

</code></pre></td><td>245.12 ns</td><td>698.34 ns</td><td>260.84 ns</td><td style="color:green"><strong>253.52 ns</strong></td><td>256.45 ns</td><td>262.70 ns</td><td>1.00</td><td>1.19 ms</td>
</tr>

<tr>
    <td>2</td><td>If Else One return</td><td><pre lang="typescript"><code>

let result;
if (xxx)
  result = a;
else if (yyyy)
  result = b;

return result;

</code></pre></td><td>242.87 ns</td><td>729.98 ns</td><td>261.44 ns</td><td><strong>253.91 ns</strong></td><td>256.74 ns</td><td>262.79 ns</td><td>1.00</td><td>1.20 ms</td>
</tr>

<tr>
    <td>3</td><td>If Else Multi return</td><td><pre lang="typescript"><code>

if (xxx)
  return a;
else if (yyyy)
  return b;

</code></pre></td><td>243.75 ns</td><td>651.86 ns</td><td>261.77 ns</td><td><strong>254.30 ns</strong></td><td>257.23 ns</td><td>263.18 ns</td><td>1.00</td><td>1.20 ms</td>
</tr>

</table>

## Set VS Regex VS In Object VS Object property (158 laps, 4096 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Object property</td><td><pre lang="typescript"><code>
if (obj['key']) { /* ... */ }
</code></pre></td><td>76.17 ns</td><td>896.46 ns</td><td>352.01 ns</td><td style="color:green"><strong>535.86 ns</strong></td><td>573.00 ns</td><td>597.75 ns</td><td>1.00</td><td>55.62 μs</td>
</tr>

<tr>
    <td>2</td><td>Object in</td><td><pre lang="typescript"><code>
if ('key' in obj) { /* ... */ }
</code></pre></td><td>77.73 ns</td><td>876.34 ns</td><td>348.94 ns</td><td><strong>537.48 ns</strong></td><td>548.93 ns</td><td>594.07 ns</td><td>0.98</td><td>55.13 μs</td>
</tr>

<tr>
    <td>3</td><td>Object hasOwnProperty</td><td><pre lang="typescript"><code>
if (obj.hasOwnProperty('key')) { /* ... */ }
</code></pre></td><td>3.57 μs</td><td>6.33 μs</td><td>3.92 μs</td><td><strong>4.03 μs</strong></td><td>4.08 μs</td><td>4.10 μs</td><td>7.15</td><td>619.06 μs</td>
</tr>

<tr>
    <td>4</td><td>Set</td><td><pre lang="typescript"><code>
const set = new Set([/* ... */]);
set.has('key')

</code></pre></td><td>4.42 μs</td><td>6.44 μs</td><td>4.73 μs</td><td><strong>4.81 μs</strong></td><td>4.86 μs</td><td>4.91 μs</td><td>8.55</td><td>747.38 μs</td>
</tr>

<tr>
    <td>5</td><td>Object.hasOwn</td><td><pre lang="typescript"><code>
if (Object.hasOwn(obj, 'key')) { /* ... */ }
</code></pre></td><td>4.46 μs</td><td>7.43 μs</td><td>4.85 μs</td><td><strong>4.96 μs</strong></td><td>5.01 μs</td><td>5.06 μs</td><td>8.81</td><td>766.08 μs</td>
</tr>

<tr>
    <td>6</td><td>RegExp</td><td><pre lang="typescript"><code>
const regex = /^(mul|div|sum|sub)$/;
regex.test('key')

</code></pre></td><td>8.99 μs</td><td>12.85 μs</td><td>9.55 μs</td><td><strong>9.59 μs</strong></td><td>9.66 μs</td><td>9.78 μs</td><td>17.01</td><td>1.51 ms</td>
</tr>

</table>

## Dynamic Function VS Arrow Function (14888 laps, 8 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Anonymous</td><td><pre lang="typescript"><code>

samples.filter(f => {
  return f > 3 && f < 9;
});

</code></pre></td><td>19.52 μs</td><td>1.34 ms</td><td>36.30 μs</td><td style="color:green"><strong>20.85 μs</strong></td><td>21.29 μs</td><td>23.70 μs</td><td>1.00</td><td>540.51 ms</td>
</tr>

<tr>
    <td>2</td><td>Function</td><td><pre lang="typescript"><code>

samples.filter(function (f) {
  return f > 3 && f < 9;
});

</code></pre></td><td>20.21 μs</td><td>85.98 ms</td><td>44.97 μs</td><td><strong>21.35 μs</strong></td><td>21.79 μs</td><td>24.05 μs</td><td>1.02</td><td>669.47 ms</td>
</tr>

</table>

## Declared Function VS Dynamic (6821 laps, 16 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Dynamic function</td><td><pre lang="typescript"><code>
samples.filter(function (f) {
        return f > 3 && f < 9;
      })
</code></pre></td><td>19.65 μs</td><td>1.30 ms</td><td>40.60 μs</td><td style="color:green"><strong>20.72 μs</strong></td><td>21.26 μs</td><td>23.46 μs</td><td>1.00</td><td>276.90 ms</td>
</tr>

<tr>
    <td>2</td><td>Declared function</td><td><pre lang="typescript"><code>
const declareFilter = (f: number) => {
        return f > 3 && f < 9;
      };
      // [...]
      samples.filter(declareFunctionFilter)
</code></pre></td><td>20.10 μs</td><td>783.93 μs</td><td>40.34 μs</td><td><strong>21.13 μs</strong></td><td>21.69 μs</td><td>23.99 μs</td><td>1.02</td><td>275.19 ms</td>
</tr>

<tr>
    <td>3</td><td>Declared arrow function</td><td><pre lang="typescript"><code>
function declareFunctionFilter(f: number) {
        return f > 3 && f < 9;
      }
      // [...]
      samples.filter(declareFunctionFilter)
</code></pre></td><td>20.74 μs</td><td>70.92 ms</td><td>60.84 μs</td><td><strong>21.48 μs</strong></td><td>22.01 μs</td><td>24.38 μs</td><td>1.04</td><td>414.97 ms</td>
</tr>

</table>

## Compose a string with `+` (plus) or with `${}` (interpolation)? (1953 laps, 256 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Interpolation</td><td><pre lang="typescript"><code>
`n°${i}\n`;

</code></pre></td><td>1.32 μs</td><td>15.77 μs</td><td>2.35 μs</td><td style="color:green"><strong>1.36 μs</strong></td><td>1.39 μs</td><td>7.53 μs</td><td>1.00</td><td>4.58 ms</td>
</tr>

<tr>
    <td>2</td><td>Plus operator</td><td><pre lang="typescript"><code>
'n°' + i + '\n';

</code></pre></td><td>1.34 μs</td><td>17.10 μs</td><td>2.34 μs</td><td><strong>1.40 μs</strong></td><td>1.45 μs</td><td>7.37 μs</td><td>1.00</td><td>4.56 ms</td>
</tr>

</table>

## Async Function VS Function (1302 laps, 8192 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Not async function (arrow)</td><td><pre lang="typescript"><code>
const notAsyncFunction = (ctx: ILapContext) => {
        return ctx.value || true;
      };
      
      notAsyncFunction(ctx);
</code></pre></td><td>7.09 ns</td><td>26.66 ns</td><td>12.79 ns</td><td style="color:green"><strong>12.63 ns</strong></td><td>12.71 ns</td><td>13.04 ns</td><td>1.00</td><td>16.65 μs</td>
</tr>

<tr>
    <td>2</td><td>Not async function</td><td><pre lang="typescript"><code>
function notAsyncFunction(ctx: ILapContext) {
        return ctx.value || true;
      };
      
      notAsyncFunction(ctx);
</code></pre></td><td>7.85 ns</td><td>28.21 ns</td><td>12.79 ns</td><td><strong>12.65 ns</strong></td><td>12.73 ns</td><td>13.07 ns</td><td>1.00</td><td>16.65 μs</td>
</tr>

<tr>
    <td>3</td><td>Async function</td><td><pre lang="typescript"><code>
async function asyncFunction(ctx: ILapContext) {
  return ctx.value || true;
};

await asyncFunction(ctx);
</code></pre></td><td>40.65 ns</td><td>553.38 ns</td><td>71.84 ns</td><td><strong>41.76 ns</strong></td><td>42.66 ns</td><td>243.21 ns</td><td>8.54</td><td>93.53 μs</td>
</tr>

<tr>
    <td>4</td><td>Async function (arrow)</td><td><pre lang="typescript"><code>
const asyncFunction = async (ctx: ILapContext) => {
  return ctx.value || true;
};

await asyncFunction(ctx);
</code></pre></td><td>40.73 ns</td><td>466.58 ns</td><td>71.72 ns</td><td><strong>41.80 ns</strong></td><td>42.64 ns</td><td>250.15 ns</td><td>8.72</td><td>93.38 μs</td>
</tr>

<tr>
    <td>5</td><td>Promise function (arrow, without async keyword)</td><td><pre lang="typescript"><code>
function promiseFunction(ctx: ILapContext) {
  return Promise.resolve(ctx.value || true);
};

await promiseFunction(ctx);
</code></pre></td><td>43.20 ns</td><td>522.47 ns</td><td>76.63 ns</td><td><strong>44.30 ns</strong></td><td>45.12 ns</td><td>247.58 ns</td><td>8.78</td><td>99.78 μs</td>
</tr>

<tr>
    <td>6</td><td>Promise function (without async keyword)</td><td><pre lang="typescript"><code>
const promiseFunction = async (ctx: ILapContext) => {
        return Promise.resolve(ctx.value || true);
      };
      
      await promiseFunction(ctx);
</code></pre></td><td>43.27 ns</td><td>524.65 ns</td><td>75.58 ns</td><td><strong>44.36 ns</strong></td><td>45.28 ns</td><td>248.93 ns</td><td>8.82</td><td>98.40 μs</td>
</tr>

</table>

