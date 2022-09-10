# Benchmark Node.js v16.17.0

## Join array (3108 laps, 4096 samples per lap)

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
</code></pre></td><td>29.57 ns</td><td>183.25 ns</td><td>33.64 ns</td><td style="color:green"><strong>30.37 ns</strong></td><td>31.32 ns</td><td>47.17 ns</td><td>1.00</td><td>104.56 μs</td>
</tr>

<tr>
    <td>2</td><td>String.concat</td><td><pre lang="typescript"><code>

str = ''.concat(... samples);
</code></pre></td><td>37.89 ns</td><td>125.49 ns</td><td>43.54 ns</td><td><strong>39.97 ns</strong></td><td>40.87 ns</td><td>61.35 ns</td><td>1.31</td><td>135.34 μs</td>
</tr>

<tr>
    <td>3</td><td>for +=</td><td><pre lang="typescript"><code>

str = samples[0];
for (let i = 1; i < samples.length; i++) {
  str += samples[i];
}
</code></pre></td><td>50.37 ns</td><td>138.11 ns</td><td>55.08 ns</td><td><strong>51.22 ns</strong></td><td>52.20 ns</td><td>72.29 ns</td><td>1.61</td><td>171.20 μs</td>
</tr>

<tr>
    <td>4</td><td>samples.join()</td><td><pre lang="typescript"><code>

str = samples.join();
</code></pre></td><td>567.36 ns</td><td>1.07 μs</td><td>643.32 ns</td><td><strong>632.64 ns</strong></td><td>646.78 ns</td><td>665.26 ns</td><td>17.86</td><td>2.00 ms</td>
</tr>

</table>

## War of Loop (7686 laps, 8192 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>for i</td><td><pre lang="typescript"><code>

for (let i = 0; i < samples.length; i++) {
  // [...]
}
</code></pre></td><td>10.84 ns</td><td>212.44 ns</td><td>11.61 ns</td><td style="color:green"><strong>11.07 ns</strong></td><td>11.18 ns</td><td>11.45 ns</td><td>1.00</td><td>89.21 μs</td>
</tr>

<tr>
    <td>2</td><td>while</td><td><pre lang="typescript"><code>

let i = 0;
while (i < samples.length) {
  // [...]
  i++;
}
</code></pre></td><td>10.84 ns</td><td>30.86 ns</td><td>11.58 ns</td><td><strong>11.07 ns</strong></td><td>11.19 ns</td><td>11.44 ns</td><td>1.00</td><td>88.99 μs</td>
</tr>

<tr>
    <td>3</td><td>forEach</td><td><pre lang="typescript"><code>

samples.forEach(val => {
  // [...]
});
</code></pre></td><td>11.67 ns</td><td>47.83 ns</td><td>13.02 ns</td><td><strong>11.99 ns</strong></td><td>14.05 ns</td><td>14.27 ns</td><td>1.20</td><td>100.07 μs</td>
</tr>

<tr>
    <td>4</td><td>for of</td><td><pre lang="typescript"><code>

for (const val of samples) {
  // [...]
}
</code></pre></td><td>13.34 ns</td><td>33.04 ns</td><td>14.29 ns</td><td><strong>13.62 ns</strong></td><td>13.77 ns</td><td>14.16 ns</td><td>1.23</td><td>109.81 μs</td>
</tr>

</table>

## Loop Key,Value from an object (2326 laps, 2048 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>for in</td><td><pre lang="typescript"><code>

for (const key in samples) {
  // ...
}
</code></pre></td><td>277.29 ns</td><td>549.12 ns</td><td>295.37 ns</td><td style="color:green"><strong>282.96 ns</strong></td><td>287.50 ns</td><td>337.11 ns</td><td>1.00</td><td>687.02 μs</td>
</tr>

<tr>
    <td>2</td><td>for of Object.entries()</td><td><pre lang="typescript"><code>

for (const [key, value] of Object.entries(samples)) {
  // ...
}
</code></pre></td><td>369.97 ns</td><td>757.47 ns</td><td>396.54 ns</td><td><strong>377.05 ns</strong></td><td>404.20 ns</td><td>436.57 ns</td><td>1.34</td><td>922.35 μs</td>
</tr>

<tr>
    <td>3</td><td>Object.keys().forEach</td><td><pre lang="typescript"><code>

Object.keys(samples).forEach(key => {
  // ...
});
</code></pre></td><td>384.37 ns</td><td>886.08 ns</td><td>408.54 ns</td><td><strong>391.99 ns</strong></td><td>400.78 ns</td><td>448.44 ns</td><td>1.37</td><td>950.26 μs</td>
</tr>

<tr>
    <td>4</td><td>for of Object.keys()</td><td><pre lang="typescript"><code>

for (const key of Object.keys(samples)) {
  // ...
}
</code></pre></td><td>390.14 ns</td><td>868.60 ns</td><td>414.58 ns</td><td><strong>398.83 ns</strong></td><td>406.64 ns</td><td>455.32 ns</td><td>1.39</td><td>964.32 μs</td>
</tr>

<tr>
    <td>5</td><td>Object.keys() + for i</td><td><pre lang="typescript"><code>

const keys = Object.keys(samples);
for (let i = 0; i < keys.length; i++) {
  // ...
}
</code></pre></td><td>396.14 ns</td><td>889.89 ns</td><td>421.01 ns</td><td><strong>405.42 ns</strong></td><td>412.60 ns</td><td>460.40 ns</td><td>1.41</td><td>979.27 μs</td>
</tr>

</table>

## Declare in loop or not (114 laps, 256 samples per lap)

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
</code></pre></td><td>1.95 μs</td><td>3.47 μs</td><td>2.06 μs</td><td style="color:green"><strong>2.00 μs</strong></td><td>2.04 μs</td><td>2.11 μs</td><td>1.00</td><td>235.06 μs</td>
</tr>

<tr>
    <td>2</td><td>let out loop</td><td><pre lang="typescript"><code>

const map = new Map<number, number>();
let myVarOutLoop: number;
for (let i = 0; i < 100; i++) {
  myVarOutLoop = i * 5;
  map.set(i, myVarOutLoop);
}
</code></pre></td><td>1.96 μs</td><td>3.51 μs</td><td>2.08 μs</td><td><strong>2.01 μs</strong></td><td>2.05 μs</td><td>2.17 μs</td><td>1.01</td><td>236.96 μs</td>
</tr>

<tr>
    <td>3</td><td>const in loop</td><td><pre lang="typescript"><code>

const map = new Map<number, number>();
for (let i = 0; i < 10000; i++) {
  const myVarInLoop = i * 5;
  map.set(i, myVarInLoop);
}
</code></pre></td><td>480.86 μs</td><td>581.59 μs</td><td>511.17 μs</td><td><strong>504.81 μs</strong></td><td>519.72 μs</td><td>545.52 μs</td><td>255.57</td><td>58.27 ms</td>
</tr>

</table>

## Join a string with an array or with +=? (5811 laps, 64 samples per lap)

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
</code></pre></td><td>7.24 μs</td><td>15.94 μs</td><td>7.92 μs</td><td style="color:green"><strong>7.48 μs</strong></td><td>7.60 μs</td><td>10.05 μs</td><td>1.00</td><td>46.03 ms</td>
</tr>

<tr>
    <td>2</td><td>array push join</td><td><pre lang="typescript"><code>

const strArray: string[] = [];
strArray.push('Hello');
strArray.push(' Mister');
const str = strArray.join();
</code></pre></td><td>22.72 μs</td><td>43.21 μs</td><td>24.60 μs</td><td><strong>23.97 μs</strong></td><td>24.80 μs</td><td>26.09 μs</td><td>2.98</td><td>142.95 ms</td>
</tr>

</table>

## (Get only, no set) Map VS Object VS switch VS if (3884 laps, 1024 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>If</td><td><pre lang="typescript"><code>
if (key === 'a') { return something }</code></pre></td><td>243.65 ns</td><td>594.04 ns</td><td>256.65 ns</td><td style="color:green"><strong>250.20 ns</strong></td><td>252.73 ns</td><td>258.11 ns</td><td>1.00</td><td>996.82 μs</td>
</tr>

<tr>
    <td>2</td><td>Switch</td><td><pre lang="typescript"><code>
switch (key)</code></pre></td><td>243.07 ns</td><td>556.25 ns</td><td>257.21 ns</td><td><strong>250.78 ns</strong></td><td>253.22 ns</td><td>258.40 ns</td><td>1.00</td><td>998.99 μs</td>
</tr>

<tr>
    <td>3</td><td>Map</td><td><pre lang="typescript"><code>
map.get(key)</code></pre></td><td>308.79 ns</td><td>916.80 ns</td><td>329.79 ns</td><td><strong>320.02 ns</strong></td><td>324.02 ns</td><td>332.42 ns</td><td>1.28</td><td>1.28 ms</td>
</tr>

<tr>
    <td>4</td><td>Object</td><td><pre lang="typescript"><code>
obj[key]</code></pre></td><td>317.87 ns</td><td>970.70 ns</td><td>338.08 ns</td><td><strong>327.73 ns</strong></td><td>331.84 ns</td><td>341.21 ns</td><td>1.32</td><td>1.31 ms</td>
</tr>

</table>

## [Set/Get] Map VS Object (1062 laps, 4096 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Object (numeric key)</td><td><pre lang="typescript"><code>
obj[1234] = value;
return obj[1234];
</code></pre></td><td>11.38 ns</td><td>37.21 ns</td><td>12.13 ns</td><td style="color:green"><strong>11.50 ns</strong></td><td>11.60 ns</td><td>12.08 ns</td><td>1.00</td><td>12.88 μs</td>
</tr>

<tr>
    <td>2</td><td>Map (numeric key)</td><td><pre lang="typescript"><code>
map.set(1234, value);
return map.get(1234);
</code></pre></td><td>10.77 ns</td><td>48.85 ns</td><td>15.70 ns</td><td><strong>15.23 ns</strong></td><td>17.82 ns</td><td>21.34 ns</td><td>1.55</td><td>16.67 μs</td>
</tr>

<tr>
    <td>3</td><td>Object (small key)</td><td><pre lang="typescript"><code>
obj['1234'] = value;
return obj['1234'];
</code></pre></td><td>16.85 ns</td><td>46.61 ns</td><td>17.87 ns</td><td><strong>17.04 ns</strong></td><td>17.26 ns</td><td>18.04 ns</td><td>1.49</td><td>18.98 μs</td>
</tr>

<tr>
    <td>4</td><td>Map (small key)</td><td><pre lang="typescript"><code>
map.set('1234', value);
return map.get('1234');
</code></pre></td><td>20.90 ns</td><td>53.22 ns</td><td>22.97 ns</td><td><strong>21.58 ns</strong></td><td>21.92 ns</td><td>26.39 ns</td><td>1.99</td><td>24.40 μs</td>
</tr>

<tr>
    <td>5</td><td>Object (symbol key)</td><td><pre lang="typescript"><code>
obj[Symbol.for(abcdef)] = value;
return obj[Symbol.for(abcdef)];
</code></pre></td><td>79.91 ns</td><td>190.38 ns</td><td>87.76 ns</td><td><strong>83.54 ns</strong></td><td>84.74 ns</td><td>90.50 ns</td><td>7.36</td><td>93.20 μs</td>
</tr>

<tr>
    <td>6</td><td>Map (symbol key)</td><td><pre lang="typescript"><code>
map.set(Symbol.for('abcdef'), value);
return map.get(Symbol.for('abcdef'));
</code></pre></td><td>85.08 ns</td><td>216.09 ns</td><td>97.22 ns</td><td><strong>92.38 ns</strong></td><td>97.36 ns</td><td>106.98 ns</td><td>8.43</td><td>103.24 μs</td>
</tr>

<tr>
    <td>7</td><td>Object</td><td><pre lang="typescript"><code>
obj['keywithalenght'] = value;
return obj['keywithalenght'];
</code></pre></td><td>65.14 ns</td><td>239.67 ns</td><td>121.96 ns</td><td><strong>122.09 ns</strong></td><td>124.19 ns</td><td>130.42 ns</td><td>10.71</td><td>129.53 μs</td>
</tr>

<tr>
    <td>8</td><td>Object (very long key)</td><td><pre lang="typescript"><code>
obj['1234'] = value;
return obj['1234'];
</code></pre></td><td>147.51 ns</td><td>241.43 ns</td><td>158.06 ns</td><td><strong>152.61 ns</strong></td><td>155.49 ns</td><td>161.87 ns</td><td>13.36</td><td>167.86 μs</td>
</tr>

<tr>
    <td>9</td><td>Map</td><td><pre lang="typescript"><code>
map.set('keywithalenght', value);
return map.get('keywithalenght');
</code></pre></td><td>57.47 ns</td><td>442.99 ns</td><td>195.33 ns</td><td><strong>196.63 ns</strong></td><td>210.06 ns</td><td>239.21 ns</td><td>18.36</td><td>207.44 μs</td>
</tr>

<tr>
    <td>10</td><td>Map (very long key)</td><td><pre lang="typescript"><code>
map.set('something-else-everyon-ok-super-ultra', value);
return map.get('something-else-everyon-ok-super-ultra');
</code></pre></td><td>208.81 ns</td><td>697.36 ns</td><td>255.18 ns</td><td><strong>235.03 ns</strong></td><td>267.38 ns</td><td>312.52 ns</td><td>23.16</td><td>271.00 μs</td>
</tr>

</table>

## If Else Return? (4059 laps, 1024 samples per lap)

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
</code></pre></td><td>242.38 ns</td><td>663.48 ns</td><td>257.04 ns</td><td style="color:green"><strong>249.32 ns</strong></td><td>252.54 ns</td><td>258.69 ns</td><td>1.00</td><td>1.04 ms</td>
</tr>

<tr>
    <td>2</td><td>If Else Multi return</td><td><pre lang="typescript"><code>

if (xxx)
  return a;
else if (yyyy)
  return b;
</code></pre></td><td>242.68 ns</td><td>583.20 ns</td><td>257.06 ns</td><td><strong>249.71 ns</strong></td><td>252.93 ns</td><td>258.59 ns</td><td>1.00</td><td>1.04 ms</td>
</tr>

<tr>
    <td>3</td><td>If Multi return</td><td><pre lang="typescript"><code>

if (xxx)
  return a;
if (yyyy)
  return b;
</code></pre></td><td>243.16 ns</td><td>686.43 ns</td><td>258.55 ns</td><td><strong>250.98 ns</strong></td><td>254.10 ns</td><td>259.67 ns</td><td>1.01</td><td>1.05 ms</td>
</tr>

</table>

## Set VS Regex VS In Object VS Object property (161 laps, 4096 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Object property</td><td><pre lang="typescript"><code>
if (obj['key']) { /* ... */ }</code></pre></td><td>73.29 ns</td><td>1.11 μs</td><td>352.74 ns</td><td style="color:green"><strong>528.00 ns</strong></td><td>572.66 ns</td><td>582.28 ns</td><td>1.00</td><td>56.79 μs</td>
</tr>

<tr>
    <td>2</td><td>Object in</td><td><pre lang="typescript"><code>
if ('key' in obj) { /* ... */ }</code></pre></td><td>73.83 ns</td><td>1.11 μs</td><td>356.21 ns</td><td><strong>530.44 ns</strong></td><td>550.54 ns</td><td>589.04 ns</td><td>0.99</td><td>57.35 μs</td>
</tr>

<tr>
    <td>3</td><td>Object hasOwnProperty</td><td><pre lang="typescript"><code>
if (obj.hasOwnProperty('key')) { /* ... */ }</code></pre></td><td>3.59 μs</td><td>5.14 μs</td><td>3.92 μs</td><td><strong>3.98 μs</strong></td><td>4.03 μs</td><td>4.14 μs</td><td>7.22</td><td>630.92 μs</td>
</tr>

<tr>
    <td>4</td><td>Set</td><td><pre lang="typescript"><code>
const set = new Set([/* ... */]);
set.has('key')
</code></pre></td><td>4.34 μs</td><td>6.32 μs</td><td>4.72 μs</td><td><strong>4.81 μs</strong></td><td>4.86 μs</td><td>4.96 μs</td><td>8.69</td><td>760.48 μs</td>
</tr>

<tr>
    <td>5</td><td>Object.hasOwn</td><td><pre lang="typescript"><code>
if (Object.hasOwn(obj, 'key')) { /* ... */ }</code></pre></td><td>4.47 μs</td><td>5.97 μs</td><td>4.85 μs</td><td><strong>4.97 μs</strong></td><td>5.02 μs</td><td>5.10 μs</td><td>8.97</td><td>781.29 μs</td>
</tr>

<tr>
    <td>6</td><td>RegExp</td><td><pre lang="typescript"><code>
const regex = /^(mul|div|sum|sub)$/;
regex.test('key')
</code></pre></td><td>7.93 μs</td><td>10.72 μs</td><td>8.44 μs</td><td><strong>8.47 μs</strong></td><td>8.58 μs</td><td>8.78 μs</td><td>15.35</td><td>1.36 ms</td>
</tr>

</table>

## Dynamic Function VS Arrow Function (10224 laps, 8 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Anonymous</td><td><pre lang="typescript"><code>

samples.filter(f => {
  return f > 3 && f < 9;
});
</code></pre></td><td>19.36 μs</td><td>45.33 ms</td><td>38.85 μs</td><td style="color:green"><strong>20.30 μs</strong></td><td>20.65 μs</td><td>23.79 μs</td><td>1.00</td><td>397.20 ms</td>
</tr>

<tr>
    <td>2</td><td>Function</td><td><pre lang="typescript"><code>

samples.filter(function (f) {
  return f > 3 && f < 9;
});
</code></pre></td><td>19.67 μs</td><td>10.79 ms</td><td>35.88 μs</td><td><strong>20.95 μs</strong></td><td>21.30 μs</td><td>24.31 μs</td><td>1.03</td><td>366.86 ms</td>
</tr>

</table>

## Declared Function VS Dynamic (6874 laps, 16 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Declared function</td><td><pre lang="typescript"><code>
const declareFilter = (f: number) => {
        return f > 3 && f < 9;
      };
      // [...]
      samples.filter(declareFunctionFilter)</code></pre></td><td>19.56 μs</td><td>50.10 ms</td><td>45.56 μs</td><td style="color:green"><strong>20.33 μs</strong></td><td>20.72 μs</td><td>24.29 μs</td><td>1.00</td><td>313.18 ms</td>
</tr>

<tr>
    <td>2</td><td>Dynamic function</td><td><pre lang="typescript"><code>
samples.filter(function (f) {
        return f > 3 && f < 9;
      })</code></pre></td><td>19.04 μs</td><td>823.09 μs</td><td>39.03 μs</td><td><strong>20.53 μs</strong></td><td>20.89 μs</td><td>24.66 μs</td><td>1.01</td><td>268.28 ms</td>
</tr>

<tr>
    <td>3</td><td>Declared arrow function</td><td><pre lang="typescript"><code>
function declareFunctionFilter(f: number) {
        return f > 3 && f < 9;
      }
      // [...]
      samples.filter(declareFunctionFilter)</code></pre></td><td>19.72 μs</td><td>760.56 μs</td><td>39.08 μs</td><td><strong>20.62 μs</strong></td><td>21.04 μs</td><td>24.78 μs</td><td>1.02</td><td>268.65 ms</td>
</tr>

</table>

## Compose a string with `+` (plus) or with `${}` (interpolation)? (9935 laps, 512 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Plus operator</td><td><pre lang="typescript"><code>
'n°' + i + '\n';
</code></pre></td><td>1.31 μs</td><td>7.75 μs</td><td>1.84 μs</td><td style="color:green"><strong>1.35 μs</strong></td><td>2.11 μs</td><td>3.26 μs</td><td>1.00</td><td>18.24 ms</td>
</tr>

<tr>
    <td>2</td><td>Interpolation</td><td><pre lang="typescript"><code>
`n°${i}\n`;
</code></pre></td><td>1.31 μs</td><td>6.39 μs</td><td>1.84 μs</td><td><strong>1.35 μs</strong></td><td>2.43 μs</td><td>3.28 μs</td><td>1.05</td><td>18.31 ms</td>
</tr>

</table>

## Async Function VS Function (2361 laps, 8192 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Not async function</td><td><pre lang="typescript"><code>
const notAsyncFunction = (ctx: ILapContext) => {
        return ctx.value || true;
      };
      
      asyncFunction(ctx);
</code></pre></td><td>5.52 ns</td><td>32.17 ns</td><td>6.17 ns</td><td style="color:green"><strong>5.97 ns</strong></td><td>5.99 ns</td><td>6.13 ns</td><td>1.00</td><td>14.58 μs</td>
</tr>

<tr>
    <td>2</td><td>Async function</td><td><pre lang="typescript"><code>
const asyncFunction = async (ctx: ILapContext) => {
  return ctx.value || true;
};

await asyncFunction(ctx);
</code></pre></td><td>38.49 ns</td><td>653.05 ns</td><td>60.92 ns</td><td><strong>39.47 ns</strong></td><td>40.32 ns</td><td>162.34 ns</td><td>13.38</td><td>143.84 μs</td>
</tr>

</table>

