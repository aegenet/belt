# Benchmark Node.js v18.16.0

## Join array (5877 laps, 4096 samples per lap)

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

</code></pre></td><td>28.00 ns</td><td>263.21 ns</td><td>32.55 ns</td><td style="color:green"><strong>29.05 ns</strong></td><td>29.57 ns</td><td>36.55 ns</td><td>1.00</td><td>191.30 μs</td>
</tr>

<tr>
    <td>2</td><td>String.concat</td><td><pre lang="typescript"><code>

str = ''.concat(... samples);

</code></pre></td><td>40.63 ns</td><td>1.12 μs</td><td>46.21 ns</td><td><strong>42.50 ns</strong></td><td>43.31 ns</td><td>51.88 ns</td><td>1.45</td><td>271.59 μs</td>
</tr>

<tr>
    <td>3</td><td>for +=</td><td><pre lang="typescript"><code>

str = samples[0];
for (let i = 1; i < samples.length; i++) {
  str += samples[i];
}

</code></pre></td><td>48.02 ns</td><td>445.31 ns</td><td>53.12 ns</td><td><strong>49.39 ns</strong></td><td>50.32 ns</td><td>59.91 ns</td><td>1.68</td><td>312.21 μs</td>
</tr>

<tr>
    <td>4</td><td>samples.join()</td><td><pre lang="typescript"><code>

str = samples.join();

</code></pre></td><td>543.04 ns</td><td>958.40 ns</td><td>630.03 ns</td><td><strong>621.87 ns</strong></td><td>635.84 ns</td><td>661.35 ns</td><td>20.17</td><td>3.70 ms</td>
</tr>

</table>

## Specific Join string array (13817 laps, 512 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>reduce</td><td><pre lang="typescript"><code>
reduce';

</code></pre></td><td>37.11 ns</td><td>1.86 μs</td><td>487.14 ns</td><td style="color:green"><strong>529.88 ns</strong></td><td>703.32 ns</td><td>841.99 ns</td><td>1.00</td><td>6.73 ms</td>
</tr>

<tr>
    <td>2</td><td>for let str+=</td><td><pre lang="typescript"><code>
interpolation, slice, join';

</code></pre></td><td>34.96 ns</td><td>2.03 μs</td><td>485.76 ns</td><td><strong>530.08 ns</strong></td><td>698.05 ns</td><td>838.28 ns</td><td>1.00</td><td>6.71 ms</td>
</tr>

<tr>
    <td>3</td><td>iterator keys()</td><td><pre lang="typescript"><code>
iterator';

</code></pre></td><td>38.87 ns</td><td>1.75 μs</td><td>503.46 ns</td><td><strong>546.29 ns</strong></td><td>734.18 ns</td><td>863.48 ns</td><td>1.03</td><td>6.96 ms</td>
</tr>

<tr>
    <td>4</td><td>Slice Join</td><td><pre lang="typescript"><code>
interpolation, slice, join';

</code></pre></td><td>50.00 ns</td><td>2.24 μs</td><td>546.42 ns</td><td><strong>593.95 ns</strong></td><td>778.32 ns</td><td>916.80 ns</td><td>1.10</td><td>7.55 ms</td>
</tr>

</table>

## War of Loop (11808 laps, 8192 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>for i</td><td><pre lang="typescript"><code>

for (let i = 0; i < samples.length; i++) {
  // [...]
}

</code></pre></td><td>10.18 ns</td><td>71.22 ns</td><td>11.06 ns</td><td style="color:green"><strong>10.73 ns</strong></td><td>10.90 ns</td><td>11.16 ns</td><td>1.00</td><td>130.63 μs</td>
</tr>

<tr>
    <td>2</td><td>while</td><td><pre lang="typescript"><code>

let i = 0;
while (i < samples.length) {
  // [...]
  i++;
}

</code></pre></td><td>9.90 ns</td><td>79.70 ns</td><td>11.11 ns</td><td><strong>10.78 ns</strong></td><td>10.94 ns</td><td>11.45 ns</td><td>1.01</td><td>131.14 μs</td>
</tr>

<tr>
    <td>3</td><td>for i (len outside)</td><td><pre lang="typescript"><code>

const len = samples.length;
for (let i = 0; i < len; i++) {
  // [...]
}

</code></pre></td><td>10.06 ns</td><td>45.41 ns</td><td>11.17 ns</td><td><strong>10.84 ns</strong></td><td>11.08 ns</td><td>11.44 ns</td><td>1.02</td><td>131.87 μs</td>
</tr>

<tr>
    <td>4</td><td>for of</td><td><pre lang="typescript"><code>

for (const val of samples) {
  // [...]
}

</code></pre></td><td>14.65 ns</td><td>80.09 ns</td><td>15.65 ns</td><td><strong>15.21 ns</strong></td><td>15.41 ns</td><td>15.86 ns</td><td>1.42</td><td>184.75 μs</td>
</tr>

<tr>
    <td>5</td><td>forEach</td><td><pre lang="typescript"><code>

samples.forEach(val => {
  // [...]
});

</code></pre></td><td>15.49 ns</td><td>179.88 ns</td><td>19.04 ns</td><td><strong>17.55 ns</strong></td><td>17.91 ns</td><td>19.25 ns</td><td>1.67</td><td>224.82 μs</td>
</tr>

</table>

## War of Sort (17392 laps, 32 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Merge sort</td><td><pre lang="typescript"><code>

      mergeSort(samples.slice(0));

</code></pre></td><td>2.97 μs</td><td>63.51 μs</td><td>3.25 μs</td><td style="color:green"><strong>3.09 μs</strong></td><td>3.13 μs</td><td>3.19 μs</td><td>1.00</td><td>56.51 ms</td>
</tr>

<tr>
    <td>2</td><td>sort</td><td><pre lang="typescript"><code>

      samples.slice(0).sort((a, b) => (b.name < a.name ? 1 : -1));

</code></pre></td><td>2.97 μs</td><td>16.63 μs</td><td>3.36 μs</td><td><strong>3.28 μs</strong></td><td>3.38 μs</td><td>3.44 μs</td><td>1.07</td><td>58.49 ms</td>
</tr>

</table>

## Loop Key,Value from an object (5806 laps, 2048 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>for in</td><td><pre lang="typescript"><code>

for (const key in samples) {
  // ...
}

</code></pre></td><td>257.71 ns</td><td>503.37 ns</td><td>278.80 ns</td><td style="color:green"><strong>265.82 ns</strong></td><td>271.58 ns</td><td>332.13 ns</td><td>1.00</td><td>1.62 ms</td>
</tr>

<tr>
    <td>2</td><td>for of Object.entries()</td><td><pre lang="typescript"><code>

for (const [key, value] of Object.entries(samples)) {
  // ...
}

</code></pre></td><td>335.01 ns</td><td>726.03 ns</td><td>367.00 ns</td><td><strong>346.44 ns</strong></td><td>379.83 ns</td><td>421.24 ns</td><td>1.32</td><td>2.13 ms</td>
</tr>

<tr>
    <td>3</td><td>Object.keys().forEach</td><td><pre lang="typescript"><code>

Object.keys(samples).forEach(key => {
  // ...
});

</code></pre></td><td>339.21 ns</td><td>1.30 μs</td><td>365.73 ns</td><td><strong>349.80 ns</strong></td><td>360.50 ns</td><td>418.99 ns</td><td>1.30</td><td>2.12 ms</td>
</tr>

<tr>
    <td>4</td><td>for of Object.keys()</td><td><pre lang="typescript"><code>

for (const key of Object.keys(samples)) {
  // ...
}

</code></pre></td><td>341.99 ns</td><td>766.89 ns</td><td>367.20 ns</td><td><strong>352.25 ns</strong></td><td>362.40 ns</td><td>420.56 ns</td><td>1.31</td><td>2.13 ms</td>
</tr>

<tr>
    <td>5</td><td>Object.keys() + for i</td><td><pre lang="typescript"><code>

const keys = Object.keys(samples);
for (let i = 0; i < keys.length; i++) {
  // ...
}

</code></pre></td><td>344.82 ns</td><td>800.68 ns</td><td>371.72 ns</td><td><strong>356.79 ns</strong></td><td>366.55 ns</td><td>424.71 ns</td><td>1.32</td><td>2.16 ms</td>
</tr>

</table>

## Declare in loop or not (228 laps, 256 samples per lap)

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

</code></pre></td><td>1.86 μs</td><td>3.92 μs</td><td>2.02 μs</td><td style="color:green"><strong>1.93 μs</strong></td><td>1.97 μs</td><td>2.09 μs</td><td>1.00</td><td>459.66 μs</td>
</tr>

<tr>
    <td>2</td><td>let out loop</td><td><pre lang="typescript"><code>

const map = new Map<number, number>();
let myVarOutLoop: number;
for (let i = 0; i < 100; i++) {
  myVarOutLoop = i * 5;
  map.set(i, myVarOutLoop);
}

</code></pre></td><td>1.87 μs</td><td>3.99 μs</td><td>2.05 μs</td><td><strong>1.94 μs</strong></td><td>1.99 μs</td><td>2.20 μs</td><td>1.02</td><td>466.89 μs</td>
</tr>

<tr>
    <td>3</td><td>const in loop</td><td><pre lang="typescript"><code>

const map = new Map<number, number>();
for (let i = 0; i < 10000; i++) {
  const myVarInLoop = i * 5;
  map.set(i, myVarInLoop);
}

</code></pre></td><td>493.62 μs</td><td>791.61 μs</td><td>528.96 μs</td><td><strong>517.19 μs</strong></td><td>538.87 μs</td><td>561.40 μs</td><td>270.09</td><td>120.60 ms</td>
</tr>

</table>

## Join a string with an array or with +=? (15611 laps, 16 samples per lap)

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

</code></pre></td><td>6.80 μs</td><td>888.99 μs</td><td>8.40 μs</td><td style="color:green"><strong>7.05 μs</strong></td><td>7.22 μs</td><td>14.47 μs</td><td>1.00</td><td>131.15 ms</td>
</tr>

<tr>
    <td>2</td><td>array push join</td><td><pre lang="typescript"><code>

const strArray: string[] = [];
strArray.push('Hello');
strArray.push(' Mister');
const str = strArray.join();

</code></pre></td><td>21.52 μs</td><td>795.61 μs</td><td>25.99 μs</td><td><strong>22.84 μs</strong></td><td>23.87 μs</td><td>38.86 μs</td><td>2.98</td><td>405.74 ms</td>
</tr>

</table>

## (Get only, no set) Map VS Object VS switch VS if (12264 laps, 1024 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Switch</td><td><pre lang="typescript"><code>
switch (key)
</code></pre></td><td>186.91 ns</td><td>636.72 ns</td><td>197.99 ns</td><td style="color:green"><strong>192.97 ns</strong></td><td>195.70 ns</td><td>199.71 ns</td><td>1.00</td><td>2.43 ms</td>
</tr>

<tr>
    <td>2</td><td>If</td><td><pre lang="typescript"><code>
if (key === 'a') { return something }
</code></pre></td><td>189.06 ns</td><td>690.23 ns</td><td>199.90 ns</td><td><strong>194.24 ns</strong></td><td>197.07 ns</td><td>201.37 ns</td><td>1.01</td><td>2.45 ms</td>
</tr>

<tr>
    <td>3</td><td>Object</td><td><pre lang="typescript"><code>
obj[key]
</code></pre></td><td>252.15 ns</td><td>801.37 ns</td><td>268.57 ns</td><td><strong>260.55 ns</strong></td><td>264.45 ns</td><td>271.68 ns</td><td>1.35</td><td>3.29 ms</td>
</tr>

<tr>
    <td>4</td><td>Map</td><td><pre lang="typescript"><code>
map.get(key)
</code></pre></td><td>265.04 ns</td><td>791.31 ns</td><td>284.11 ns</td><td><strong>275.59 ns</strong></td><td>279.98 ns</td><td>289.26 ns</td><td>1.44</td><td>3.48 ms</td>
</tr>

</table>

## [Set/Get] Map VS Object (927 laps, 8192 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Object (numeric key)</td><td><pre lang="typescript"><code>
obj[1234] = value;
return obj[1234];

</code></pre></td><td>12.40 ns</td><td>25.49 ns</td><td>13.47 ns</td><td style="color:green"><strong>13.16 ns</strong></td><td>13.32 ns</td><td>13.55 ns</td><td>1.00</td><td>12.49 μs</td>
</tr>

<tr>
    <td>2</td><td>Map (numeric key)</td><td><pre lang="typescript"><code>
map.set(1234, value);
return map.get(1234);

</code></pre></td><td>11.99 ns</td><td>47.55 ns</td><td>15.64 ns</td><td><strong>14.81 ns</strong></td><td>17.38 ns</td><td>20.07 ns</td><td>1.31</td><td>14.50 μs</td>
</tr>

<tr>
    <td>3</td><td>Object (small key)</td><td><pre lang="typescript"><code>
obj['1234'] = value;
return obj['1234'];

</code></pre></td><td>17.09 ns</td><td>57.60 ns</td><td>18.04 ns</td><td><strong>17.64 ns</strong></td><td>17.90 ns</td><td>18.24 ns</td><td>1.34</td><td>16.73 μs</td>
</tr>

<tr>
    <td>4</td><td>Map (small key)</td><td><pre lang="typescript"><code>
map.set('1234', value);
return map.get('1234');

</code></pre></td><td>20.08 ns</td><td>60.50 ns</td><td>26.47 ns</td><td><strong>25.95 ns</strong></td><td>26.34 ns</td><td>26.88 ns</td><td>1.98</td><td>24.54 μs</td>
</tr>

<tr>
    <td>5</td><td>Object (symbol key)</td><td><pre lang="typescript"><code>
obj[Symbol.for(abcdef)] = value;
return obj[Symbol.for(abcdef)];

</code></pre></td><td>79.91 ns</td><td>178.72 ns</td><td>85.16 ns</td><td><strong>82.97 ns</strong></td><td>84.47 ns</td><td>88.42 ns</td><td>6.39</td><td>78.95 μs</td>
</tr>

<tr>
    <td>6</td><td>Map (symbol key)</td><td><pre lang="typescript"><code>
map.set(Symbol.for('abcdef'), value);
return map.get(Symbol.for('abcdef'));

</code></pre></td><td>83.94 ns</td><td>167.86 ns</td><td>93.42 ns</td><td><strong>90.93 ns</strong></td><td>96.24 ns</td><td>102.04 ns</td><td>7.23</td><td>86.60 μs</td>
</tr>

<tr>
    <td>7</td><td>Object</td><td><pre lang="typescript"><code>
obj['keywithalenght'] = value;
return obj['keywithalenght'];

</code></pre></td><td>66.44 ns</td><td>203.04 ns</td><td>114.49 ns</td><td><strong>116.70 ns</strong></td><td>118.75 ns</td><td>122.94 ns</td><td>8.95</td><td>106.13 μs</td>
</tr>

<tr>
    <td>8</td><td>Object (very long key)</td><td><pre lang="typescript"><code>
obj['something-else-everyon-ok-super-ultra'] = value;
return obj['something-else-everyon-ok-super-ultra'];

</code></pre></td><td>145.42 ns</td><td>269.36 ns</td><td>152.88 ns</td><td><strong>150.12 ns</strong></td><td>152.69 ns</td><td>157.97 ns</td><td>11.51</td><td>141.72 μs</td>
</tr>

<tr>
    <td>9</td><td>Map</td><td><pre lang="typescript"><code>
map.set('keywithalenght', value);
return map.get('keywithalenght');

</code></pre></td><td>58.06 ns</td><td>288.45 ns</td><td>152.98 ns</td><td><strong>157.65 ns</strong></td><td>168.15 ns</td><td>182.37 ns</td><td>12.70</td><td>141.82 μs</td>
</tr>

<tr>
    <td>10</td><td>Map (very long key)</td><td><pre lang="typescript"><code>
map.set('something-else-everyon-ok-super-ultra', value);
return map.get('something-else-everyon-ok-super-ultra');

</code></pre></td><td>191.94 ns</td><td>356.29 ns</td><td>220.99 ns</td><td><strong>215.48 ns</strong></td><td>227.40 ns</td><td>246.18 ns</td><td>17.22</td><td>204.86 μs</td>
</tr>

</table>

## If Else Return? (19837 laps, 1024 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>If Else Multi return</td><td><pre lang="typescript"><code>

if (xxx)
  return a;
else if (yyyy)
  return b;

</code></pre></td><td>187.70 ns</td><td>622.27 ns</td><td>196.61 ns</td><td style="color:green"><strong>192.29 ns</strong></td><td>194.53 ns</td><td>197.36 ns</td><td>1.00</td><td>3.90 ms</td>
</tr>

<tr>
    <td>2</td><td>If Multi return</td><td><pre lang="typescript"><code>

if (xxx)
  return a;
if (yyyy)
  return b;

</code></pre></td><td>186.43 ns</td><td>699.71 ns</td><td>196.57 ns</td><td><strong>192.29 ns</strong></td><td>194.63 ns</td><td>197.56 ns</td><td>1.00</td><td>3.90 ms</td>
</tr>

<tr>
    <td>3</td><td>If Else One return</td><td><pre lang="typescript"><code>

let result;
if (xxx)
  result = a;
else if (yyyy)
  result = b;

return result;

</code></pre></td><td>185.55 ns</td><td>653.32 ns</td><td>196.76 ns</td><td><strong>192.38 ns</strong></td><td>194.63 ns</td><td>197.66 ns</td><td>1.00</td><td>3.90 ms</td>
</tr>

</table>

## Set VS Regex VS In Object VS Object property (338 laps, 4096 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Object property</td><td><pre lang="typescript"><code>
if (obj['key']) { /* ... */ }
</code></pre></td><td>73.88 ns</td><td>1.22 μs</td><td>445.01 ns</td><td style="color:green"><strong>515.09 ns</strong></td><td>559.77 ns</td><td>576.78 ns</td><td>1.00</td><td>150.41 μs</td>
</tr>

<tr>
    <td>2</td><td>Object in</td><td><pre lang="typescript"><code>
if ('key' in obj) { /* ... */ }
</code></pre></td><td>74.54 ns</td><td>976.86 ns</td><td>448.04 ns</td><td><strong>515.82 ns</strong></td><td>565.48 ns</td><td>588.62 ns</td><td>1.01</td><td>151.44 μs</td>
</tr>

<tr>
    <td>3</td><td>Object hasOwnProperty</td><td><pre lang="typescript"><code>
if (obj.hasOwnProperty('key')) { /* ... */ }
</code></pre></td><td>3.28 μs</td><td>4.69 μs</td><td>3.82 μs</td><td><strong>3.89 μs</strong></td><td>3.95 μs</td><td>4.02 μs</td><td>7.18</td><td>1.29 ms</td>
</tr>

<tr>
    <td>4</td><td>Object.hasOwn</td><td><pre lang="typescript"><code>
if (Object.hasOwn(obj, 'key')) { /* ... */ }
</code></pre></td><td>4.30 μs</td><td>6.54 μs</td><td>4.82 μs</td><td><strong>4.85 μs</strong></td><td>4.93 μs</td><td>5.01 μs</td><td>8.96</td><td>1.63 ms</td>
</tr>

<tr>
    <td>5</td><td>Set</td><td><pre lang="typescript"><code>
const set = new Set([/* ... */]);
set.has('key')

</code></pre></td><td>4.36 μs</td><td>6.64 μs</td><td>5.15 μs</td><td><strong>5.26 μs</strong></td><td>5.34 μs</td><td>5.43 μs</td><td>9.71</td><td>1.74 ms</td>
</tr>

<tr>
    <td>6</td><td>RegExp</td><td><pre lang="typescript"><code>
const regex = /^(mul|div|sum|sub)$/;
regex.test('key')

</code></pre></td><td>7.73 μs</td><td>10.36 μs</td><td>8.21 μs</td><td><strong>8.20 μs</strong></td><td>8.29 μs</td><td>8.40 μs</td><td>15.07</td><td>2.77 ms</td>
</tr>

</table>

## Workers War (55 laps, 8 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>One Worker Eval</td><td><pre lang="typescript"><code>

const worker = new Worker('code'); each time worker.send

</code></pre></td><td>22.36 μs</td><td>58.38 μs</td><td>29.19 μs</td><td style="color:green"><strong>27.17 μs</strong></td><td>31.75 μs</td><td>36.00 μs</td><td>1.00</td><td>1.61 ms</td>
</tr>

<tr>
    <td>2</td><td>One Worker</td><td><pre lang="typescript"><code>

const worker = new Worker(); each time worker.send

</code></pre></td><td>26.19 μs</td><td>55.69 μs</td><td>33.88 μs</td><td><strong>32.45 μs</strong></td><td>34.91 μs</td><td>43.19 μs</td><td>1.16</td><td>1.86 ms</td>
</tr>

<tr>
    <td>3</td><td>new Worker Eval</td><td><pre lang="typescript"><code>

    new Worker('code') each time
    
</code></pre></td><td>31.76 ms</td><td>36.09 ms</td><td>32.68 ms</td><td><strong>32.52 ms</strong></td><td>32.82 ms</td><td>33.54 ms</td><td>1041.60</td><td>1.80 sec.</td>
</tr>

<tr>
    <td>4</td><td>new Worker</td><td><pre lang="typescript"><code>

    new Worker() each time
    
</code></pre></td><td>34.03 ms</td><td>37.52 ms</td><td>34.96 ms</td><td><strong>34.92 ms</strong></td><td>35.17 ms</td><td>35.45 ms</td><td>1111.77</td><td>1.92 sec.</td>
</tr>

</table>

## Dynamic Function VS Arrow Function (28650 laps, 16 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Anonymous</td><td><pre lang="typescript"><code>

samples.filter(f => {
  return f > 3 && f < 9;
});

</code></pre></td><td>18.82 μs</td><td>74.23 μs</td><td>20.29 μs</td><td style="color:green"><strong>19.59 μs</strong></td><td>19.75 μs</td><td>20.50 μs</td><td>1.00</td><td>581.44 ms</td>
</tr>

<tr>
    <td>2</td><td>Function</td><td><pre lang="typescript"><code>

samples.filter(function (f) {
  return f > 3 && f < 9;
});

</code></pre></td><td>19.66 μs</td><td>57.89 μs</td><td>21.38 μs</td><td><strong>20.67 μs</strong></td><td>20.91 μs</td><td>21.80 μs</td><td>1.06</td><td>612.68 ms</td>
</tr>

</table>

## Declared Function VS Dynamic (6278 laps, 8 samples per lap)

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
      samples.filter(declareFunctionFilter)
</code></pre></td><td>18.16 μs</td><td>87.85 μs</td><td>20.47 μs</td><td style="color:green"><strong>19.34 μs</strong></td><td>19.74 μs</td><td>22.98 μs</td><td>1.00</td><td>128.50 ms</td>
</tr>

<tr>
    <td>2</td><td>Declared arrow function</td><td><pre lang="typescript"><code>
function declareFunctionFilter(f: number) {
        return f > 3 && f < 9;
      }
      // [...]
      samples.filter(declareFunctionFilter)
</code></pre></td><td>18.64 μs</td><td>91.27 μs</td><td>20.71 μs</td><td><strong>19.54 μs</strong></td><td>19.91 μs</td><td>23.04 μs</td><td>1.01</td><td>130.04 ms</td>
</tr>

<tr>
    <td>3</td><td>Dynamic function</td><td><pre lang="typescript"><code>
samples.filter(function (f) {
        return f > 3 && f < 9;
      })
</code></pre></td><td>19.02 μs</td><td>419.33 μs</td><td>21.49 μs</td><td><strong>20.05 μs</strong></td><td>20.49 μs</td><td>24.93 μs</td><td>1.05</td><td>134.93 ms</td>
</tr>

</table>

## Compose a string with `+` (plus) or with `${}` (interpolation)? (17330 laps, 512 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Plus operator</td><td><pre lang="typescript"><code>
'n°' + i + '\n';

</code></pre></td><td>1.21 μs</td><td>3.45 μs</td><td>1.37 μs</td><td style="color:green"><strong>1.29 μs</strong></td><td>1.50 μs</td><td>1.56 μs</td><td>1.00</td><td>23.72 ms</td>
</tr>

<tr>
    <td>2</td><td>Interpolation</td><td><pre lang="typescript"><code>
`n°${i}\n`;

</code></pre></td><td>1.21 μs</td><td>4.06 μs</td><td>1.37 μs</td><td><strong>1.29 μs</strong></td><td>1.50 μs</td><td>1.56 μs</td><td>1.00</td><td>23.74 ms</td>
</tr>

</table>

## Async Function VS Function (4574 laps, 8192 samples per lap)

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
</code></pre></td><td>7.51 ns</td><td>29.53 ns</td><td>7.84 ns</td><td style="color:green"><strong>7.70 ns</strong></td><td>7.75 ns</td><td>7.84 ns</td><td>1.00</td><td>35.84 μs</td>
</tr>

<tr>
    <td>2</td><td>Not async function (arrow)</td><td><pre lang="typescript"><code>
const notAsyncFunction = (ctx: ILapContext) => {
        return ctx.value || true;
      };
      
      notAsyncFunction(ctx);
</code></pre></td><td>7.04 ns</td><td>21.00 ns</td><td>7.85 ns</td><td><strong>7.73 ns</strong></td><td>7.78 ns</td><td>7.87 ns</td><td>1.00</td><td>35.89 μs</td>
</tr>

<tr>
    <td>3</td><td>Async function (arrow)</td><td><pre lang="typescript"><code>
const asyncFunction = async (ctx: ILapContext) => {
  return ctx.value || true;
};

await asyncFunction(ctx);
</code></pre></td><td>38.02 ns</td><td>82.87 ns</td><td>42.07 ns</td><td><strong>39.51 ns</strong></td><td>40.53 ns</td><td>53.66 ns</td><td>5.74</td><td>192.41 μs</td>
</tr>

<tr>
    <td>4</td><td>Async function</td><td><pre lang="typescript"><code>
async function asyncFunction(ctx: ILapContext) {
  return ctx.value || true;
};

await asyncFunction(ctx);
</code></pre></td><td>38.20 ns</td><td>88.95 ns</td><td>42.12 ns</td><td><strong>39.58 ns</strong></td><td>40.59 ns</td><td>53.66 ns</td><td>5.75</td><td>192.66 μs</td>
</tr>

<tr>
    <td>5</td><td>Promise function (arrow, without async keyword)</td><td><pre lang="typescript"><code>
function promiseFunction(ctx: ILapContext) {
  return Promise.resolve(ctx.value || true);
};

await promiseFunction(ctx);
</code></pre></td><td>40.56 ns</td><td>99.68 ns</td><td>44.45 ns</td><td><strong>42.00 ns</strong></td><td>43.03 ns</td><td>56.10 ns</td><td>6.06</td><td>203.31 μs</td>
</tr>

<tr>
    <td>6</td><td>Promise function (without async keyword)</td><td><pre lang="typescript"><code>
const promiseFunction = async (ctx: ILapContext) => {
        return Promise.resolve(ctx.value || true);
      };
      
      await promiseFunction(ctx);
</code></pre></td><td>40.56 ns</td><td>119.23 ns</td><td>44.68 ns</td><td><strong>42.05 ns</strong></td><td>43.09 ns</td><td>56.26 ns</td><td>6.07</td><td>204.38 μs</td>
</tr>

</table>

## Date.now() VS new Date().getTime() (21581 laps, 4096 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Date.now()</td><td><pre lang="typescript"><code>

time = Date.now();

</code></pre></td><td>47.71 ns</td><td>178.49 ns</td><td>50.81 ns</td><td style="color:green"><strong>49.88 ns</strong></td><td>50.56 ns</td><td>51.59 ns</td><td>1.00</td><td>1.10 ms</td>
</tr>

<tr>
    <td>2</td><td>new Date().getTime()</td><td><pre lang="typescript"><code>

time = new Date().getTime();

</code></pre></td><td>91.80 ns</td><td>815.99 ns</td><td>97.94 ns</td><td><strong>94.92 ns</strong></td><td>96.31 ns</td><td>100.88 ns</td><td>1.92</td><td>2.11 ms</td>
</tr>

</table>

## new Object() vs Curly braces ({}) (2634 laps, 1 samples per lap)

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

</code></pre></td><td>463.70 μs</td><td>7.36 ms</td><td>689.29 μs</td><td style="color:green"><strong>529.40 μs</strong></td><td>554.40 μs</td><td>694.10 μs</td><td>1.00</td><td>1.82 sec.</td>
</tr>

<tr>
    <td>2</td><td>Curly braces {}</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, {});
}

</code></pre></td><td>466.00 μs</td><td>7.35 ms</td><td>685.26 μs</td><td><strong>531.50 μs</strong></td><td>552.30 μs</td><td>673.80 μs</td><td>0.99</td><td>1.80 sec.</td>
</tr>

<tr>
    <td>3</td><td>Object.create({})</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, Object.create());
}

</code></pre></td><td>4.36 ms</td><td>15.96 ms</td><td>5.46 ms</td><td><strong>4.83 ms</strong></td><td>6.34 ms</td><td>7.00 ms</td><td>10.22</td><td>14.38 sec.</td>
</tr>

</table>

## alphanum fight (217 laps, 1 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>checkString dumb</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, checkStringDumb);
}

</code></pre></td><td>16.62 ms</td><td>48.45 ms</td><td>20.61 ms</td><td style="color:green"><strong>17.97 ms</strong></td><td>25.38 ms</td><td>27.14 ms</td><td>1.00</td><td>4.47 sec.</td>
</tr>

<tr>
    <td>2</td><td>/^[a-z0-9]+$/gi</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, regex2.test);
}

</code></pre></td><td>16.80 ms</td><td>47.46 ms</td><td>20.82 ms</td><td><strong>18.15 ms</strong></td><td>25.47 ms</td><td>27.11 ms</td><td>1.00</td><td>4.52 sec.</td>
</tr>

<tr>
    <td>3</td><td>/^[a-zA-Z0-9]+$/g</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
const regex = /[a-zA-Z0-9]/g;
for (let i = 0; i < 10000; i++) {
  map.set(i, regex.test(crypto.randomBytes(20).toString('hex')));
}
return map;

</code></pre></td><td>16.97 ms</td><td>50.02 ms</td><td>20.72 ms</td><td><strong>18.16 ms</strong></td><td>25.36 ms</td><td>27.37 ms</td><td>1.01</td><td>4.50 sec.</td>
</tr>

<tr>
    <td>4</td><td>checkString if</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, checkString);
}

</code></pre></td><td>17.59 ms</td><td>45.96 ms</td><td>21.53 ms</td><td><strong>18.86 ms</strong></td><td>26.41 ms</td><td>27.80 ms</td><td>1.04</td><td>4.67 sec.</td>
</tr>

<tr>
    <td>5</td><td>checkString Object</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, checkStringObject);
}

</code></pre></td><td>23.01 ms</td><td>62.81 ms</td><td>27.30 ms</td><td><strong>24.69 ms</strong></td><td>31.89 ms</td><td>33.70 ms</td><td>1.28</td><td>5.92 sec.</td>
</tr>

</table>

## Cost of try catch (50 laps, 8192 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Without try/catch</td><td><pre lang="typescript"><code>

for (let i = 0; i < samples.length; i++) {
  // Without try catch
}

</code></pre></td><td>10.16 ns</td><td>12.67 ns</td><td>10.87 ns</td><td style="color:green"><strong>10.85 ns</strong></td><td>11.04 ns</td><td>11.25 ns</td><td>1.00</td><td>543.35 ns</td>
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

</code></pre></td><td>10.28 ns</td><td>14.88 ns</td><td>11.28 ns</td><td><strong>11.17 ns</strong></td><td>11.33 ns</td><td>11.73 ns</td><td>1.03</td><td>563.98 ns</td>
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

</code></pre></td><td>13.89 ns</td><td>18.12 ns</td><td>14.41 ns</td><td><strong>14.20 ns</strong></td><td>14.37 ns</td><td>15.65 ns</td><td>1.33</td><td>720.25 ns</td>
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

</code></pre></td><td>28.01 μs</td><td>105.11 μs</td><td>99.12 μs</td><td><strong>101.87 μs</strong></td><td>102.29 μs</td><td>103.06 μs</td><td>9269.49</td><td>4.96 ms</td>
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

</code></pre></td><td>34.14 μs</td><td>129.03 μs</td><td>123.29 μs</td><td><strong>126.80 μs</strong></td><td>127.26 μs</td><td>127.82 μs</td><td>11522.79</td><td>6.16 ms</td>
</tr>

</table>

