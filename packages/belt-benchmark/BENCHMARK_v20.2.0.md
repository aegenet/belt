# Benchmark Node.js v20.2.0

## Join array (6127 laps, 4096 samples per lap)

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

</code></pre></td><td>28.34 ns</td><td>146.26 ns</td><td>33.59 ns</td><td style="color:green"><strong>29.96 ns</strong></td><td>30.83 ns</td><td>37.87 ns</td><td>1.00</td><td>205.78 μs</td>
</tr>

<tr>
    <td>2</td><td>String.concat</td><td><pre lang="typescript"><code>

str = ''.concat(... samples);

</code></pre></td><td>42.92 ns</td><td>177.05 ns</td><td>48.85 ns</td><td><strong>44.90 ns</strong></td><td>45.87 ns</td><td>55.62 ns</td><td>1.48</td><td>299.32 μs</td>
</tr>

<tr>
    <td>3</td><td>for +=</td><td><pre lang="typescript"><code>

str = samples[0];
for (let i = 1; i < samples.length; i++) {
  str += samples[i];
}

</code></pre></td><td>48.66 ns</td><td>386.06 ns</td><td>56.34 ns</td><td><strong>52.88 ns</strong></td><td>54.03 ns</td><td>63.84 ns</td><td>1.73</td><td>345.17 μs</td>
</tr>

<tr>
    <td>4</td><td>samples.join()</td><td><pre lang="typescript"><code>

str = samples.join();

</code></pre></td><td>547.80 ns</td><td>1.21 μs</td><td>689.66 ns</td><td><strong>679.13 ns</strong></td><td>696.44 ns</td><td>726.17 ns</td><td>21.30</td><td>4.23 ms</td>
</tr>

</table>

## Specific Join string array (13622 laps, 512 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>for let str+=</td><td><pre lang="typescript"><code>
interpolation, slice, join';

</code></pre></td><td>34.18 ns</td><td>2.07 μs</td><td>534.00 ns</td><td style="color:green"><strong>586.13 ns</strong></td><td>799.80 ns</td><td>937.30 ns</td><td>1.00</td><td>7.27 ms</td>
</tr>

<tr>
    <td>2</td><td>reduce</td><td><pre lang="typescript"><code>
reduce';

</code></pre></td><td>36.91 ns</td><td>1.63 μs</td><td>543.16 ns</td><td><strong>588.67 ns</strong></td><td>811.91 ns</td><td>947.07 ns</td><td>1.01</td><td>7.40 ms</td>
</tr>

<tr>
    <td>3</td><td>iterator keys()</td><td><pre lang="typescript"><code>
iterator';

</code></pre></td><td>38.28 ns</td><td>1.82 μs</td><td>553.70 ns</td><td><strong>600.78 ns</strong></td><td>827.93 ns</td><td>968.16 ns</td><td>1.03</td><td>7.54 ms</td>
</tr>

<tr>
    <td>4</td><td>Slice Join</td><td><pre lang="typescript"><code>
interpolation, slice, join';

</code></pre></td><td>50.20 ns</td><td>1.85 μs</td><td>592.26 ns</td><td><strong>649.61 ns</strong></td><td>868.16 ns</td><td>1.01 μs</td><td>1.09</td><td>8.07 ms</td>
</tr>

</table>

## War of Loop (11463 laps, 8192 samples per lap)

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

</code></pre></td><td>10.53 ns</td><td>30.08 ns</td><td>11.53 ns</td><td style="color:green"><strong>11.32 ns</strong></td><td>11.43 ns</td><td>11.62 ns</td><td>1.00</td><td>132.21 μs</td>
</tr>

<tr>
    <td>2</td><td>for i (len outside)</td><td><pre lang="typescript"><code>

const len = samples.length;
for (let i = 0; i < len; i++) {
  // [...]
}

</code></pre></td><td>10.57 ns</td><td>28.12 ns</td><td>11.53 ns</td><td><strong>11.32 ns</strong></td><td>11.44 ns</td><td>11.62 ns</td><td>1.00</td><td>132.20 μs</td>
</tr>

<tr>
    <td>3</td><td>for i</td><td><pre lang="typescript"><code>

for (let i = 0; i < samples.length; i++) {
  // [...]
}

</code></pre></td><td>10.45 ns</td><td>32.17 ns</td><td>11.55 ns</td><td><strong>11.32 ns</strong></td><td>11.44 ns</td><td>11.62 ns</td><td>1.00</td><td>132.39 μs</td>
</tr>

<tr>
    <td>4</td><td>for of</td><td><pre lang="typescript"><code>

for (const val of samples) {
  // [...]
}

</code></pre></td><td>13.96 ns</td><td>35.82 ns</td><td>14.96 ns</td><td><strong>14.62 ns</strong></td><td>14.78 ns</td><td>15.05 ns</td><td>1.29</td><td>171.49 μs</td>
</tr>

<tr>
    <td>5</td><td>forEach</td><td><pre lang="typescript"><code>

samples.forEach(val => {
  // [...]
});

</code></pre></td><td>14.62 ns</td><td>71.94 ns</td><td>16.74 ns</td><td><strong>15.27 ns</strong></td><td>15.52 ns</td><td>16.76 ns</td><td>1.38</td><td>191.86 μs</td>
</tr>

</table>

## War of Sort (18769 laps, 128 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>sort</td><td><pre lang="typescript"><code>

      samples.slice(0).sort((a, b) => (b.name < a.name ? 1 : -1));

</code></pre></td><td>2.76 μs</td><td>8.75 μs</td><td>3.00 μs</td><td style="color:green"><strong>2.94 μs</strong></td><td>2.99 μs</td><td>3.10 μs</td><td>1.00</td><td>56.37 ms</td>
</tr>

<tr>
    <td>2</td><td>Merge sort</td><td><pre lang="typescript"><code>

      mergeSort(samples.slice(0));

</code></pre></td><td>2.95 μs</td><td>7.65 μs</td><td>3.20 μs</td><td><strong>3.07 μs</strong></td><td>3.11 μs</td><td>3.45 μs</td><td>1.07</td><td>60.03 ms</td>
</tr>

</table>

## Loop Key,Value from an object (6765 laps, 2048 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>for in</td><td><pre lang="typescript"><code>

for (const key in samples) {
  // ...
}

</code></pre></td><td>255.62 ns</td><td>588.87 ns</td><td>278.48 ns</td><td style="color:green"><strong>264.94 ns</strong></td><td>272.12 ns</td><td>328.22 ns</td><td>1.00</td><td>1.88 ms</td>
</tr>

<tr>
    <td>2</td><td>for of Object.keys()</td><td><pre lang="typescript"><code>

for (const key of Object.keys(samples)) {
  // ...
}

</code></pre></td><td>350.29 ns</td><td>997.80 ns</td><td>379.45 ns</td><td><strong>363.62 ns</strong></td><td>375.49 ns</td><td>431.01 ns</td><td>1.35</td><td>2.57 ms</td>
</tr>

<tr>
    <td>3</td><td>Object.keys().forEach</td><td><pre lang="typescript"><code>

Object.keys(samples).forEach(key => {
  // ...
});

</code></pre></td><td>349.56 ns</td><td>932.91 ns</td><td>381.12 ns</td><td><strong>364.21 ns</strong></td><td>377.15 ns</td><td>434.13 ns</td><td>1.36</td><td>2.58 ms</td>
</tr>

<tr>
    <td>4</td><td>Object.keys() + for i</td><td><pre lang="typescript"><code>

const keys = Object.keys(samples);
for (let i = 0; i < keys.length; i++) {
  // ...
}

</code></pre></td><td>352.15 ns</td><td>811.52 ns</td><td>382.00 ns</td><td><strong>366.50 ns</strong></td><td>376.90 ns</td><td>432.81 ns</td><td>1.36</td><td>2.58 ms</td>
</tr>

<tr>
    <td>5</td><td>for of Object.entries()</td><td><pre lang="typescript"><code>

for (const [key, value] of Object.entries(samples)) {
  // ...
}

</code></pre></td><td>360.89 ns</td><td>972.02 ns</td><td>395.45 ns</td><td><strong>374.95 ns</strong></td><td>412.06 ns</td><td>449.90 ns</td><td>1.43</td><td>2.68 ms</td>
</tr>

</table>

## Declare in loop or not (210 laps, 256 samples per lap)

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

</code></pre></td><td>1.84 μs</td><td>3.94 μs</td><td>2.01 μs</td><td style="color:green"><strong>1.91 μs</strong></td><td>1.96 μs</td><td>2.12 μs</td><td>1.00</td><td>422.06 μs</td>
</tr>

<tr>
    <td>2</td><td>let out loop</td><td><pre lang="typescript"><code>

const map = new Map<number, number>();
let myVarOutLoop: number;
for (let i = 0; i < 100; i++) {
  myVarOutLoop = i * 5;
  map.set(i, myVarOutLoop);
}

</code></pre></td><td>1.84 μs</td><td>4.50 μs</td><td>2.04 μs</td><td><strong>1.92 μs</strong></td><td>1.98 μs</td><td>2.19 μs</td><td>1.02</td><td>428.24 μs</td>
</tr>

<tr>
    <td>3</td><td>const in loop</td><td><pre lang="typescript"><code>

const map = new Map<number, number>();
for (let i = 0; i < 10000; i++) {
  const myVarInLoop = i * 5;
  map.set(i, myVarInLoop);
}

</code></pre></td><td>487.27 μs</td><td>895.26 μs</td><td>539.97 μs</td><td><strong>536.88 μs</strong></td><td>551.47 μs</td><td>566.72 μs</td><td>276.40</td><td>113.39 ms</td>
</tr>

</table>

## Join a string with an array or with +=? (20923 laps, 32 samples per lap)

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

</code></pre></td><td>6.16 μs</td><td>23.28 μs</td><td>6.67 μs</td><td style="color:green"><strong>6.37 μs</strong></td><td>6.47 μs</td><td>6.89 μs</td><td>1.00</td><td>139.60 ms</td>
</tr>

<tr>
    <td>2</td><td>array push join</td><td><pre lang="typescript"><code>

const strArray: string[] = [];
strArray.push('Hello');
strArray.push(' Mister');
const str = strArray.join();

</code></pre></td><td>20.31 μs</td><td>55.46 μs</td><td>23.40 μs</td><td><strong>22.46 μs</strong></td><td>23.30 μs</td><td>26.85 μs</td><td>3.68</td><td>489.65 ms</td>
</tr>

</table>

## (Get only, no set) Map VS Object VS switch VS if (9916 laps, 2048 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Switch</td><td><pre lang="typescript"><code>
switch (key)
</code></pre></td><td>189.01 ns</td><td>456.40 ns</td><td>197.14 ns</td><td style="color:green"><strong>192.82 ns</strong></td><td>195.56 ns</td><td>199.76 ns</td><td>1.00</td><td>1.95 ms</td>
</tr>

<tr>
    <td>2</td><td>If</td><td><pre lang="typescript"><code>
if (key === 'a') { return something }
</code></pre></td><td>189.65 ns</td><td>494.68 ns</td><td>197.91 ns</td><td><strong>193.65 ns</strong></td><td>196.34 ns</td><td>201.17 ns</td><td>1.01</td><td>1.96 ms</td>
</tr>

<tr>
    <td>3</td><td>Map</td><td><pre lang="typescript"><code>
map.get(key)
</code></pre></td><td>257.67 ns</td><td>554.20 ns</td><td>272.39 ns</td><td><strong>266.60 ns</strong></td><td>270.41 ns</td><td>278.42 ns</td><td>1.39</td><td>2.70 ms</td>
</tr>

<tr>
    <td>4</td><td>Object</td><td><pre lang="typescript"><code>
obj[key]
</code></pre></td><td>259.72 ns</td><td>1.04 μs</td><td>273.54 ns</td><td><strong>267.14 ns</strong></td><td>271.00 ns</td><td>279.25 ns</td><td>1.39</td><td>2.71 ms</td>
</tr>

</table>

## [Set/Get] Map VS Object (982 laps, 8192 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Object (numeric key)</td><td><pre lang="typescript"><code>
obj[1234] = value;
return obj[1234];

</code></pre></td><td>11.61 ns</td><td>23.39 ns</td><td>12.53 ns</td><td style="color:green"><strong>12.32 ns</strong></td><td>12.45 ns</td><td>12.62 ns</td><td>1.00</td><td>12.30 μs</td>
</tr>

<tr>
    <td>2</td><td>Map (numeric key)</td><td><pre lang="typescript"><code>
map.set(1234, value);
return map.get(1234);

</code></pre></td><td>11.21 ns</td><td>28.97 ns</td><td>14.13 ns</td><td><strong>13.40 ns</strong></td><td>15.61 ns</td><td>17.75 ns</td><td>1.25</td><td>13.88 μs</td>
</tr>

<tr>
    <td>3</td><td>Object (small key)</td><td><pre lang="typescript"><code>
obj['1234'] = value;
return obj['1234'];

</code></pre></td><td>15.86 ns</td><td>31.90 ns</td><td>16.82 ns</td><td><strong>16.60 ns</strong></td><td>16.77 ns</td><td>17.00 ns</td><td>1.35</td><td>16.52 μs</td>
</tr>

<tr>
    <td>4</td><td>Map (small key)</td><td><pre lang="typescript"><code>
map.set('1234', value);
return map.get('1234');

</code></pre></td><td>18.62 ns</td><td>41.49 ns</td><td>21.51 ns</td><td><strong>21.15 ns</strong></td><td>21.41 ns</td><td>21.89 ns</td><td>1.72</td><td>21.12 μs</td>
</tr>

<tr>
    <td>5</td><td>Object (symbol key)</td><td><pre lang="typescript"><code>
obj[Symbol.for(abcdef)] = value;
return obj[Symbol.for(abcdef)];

</code></pre></td><td>83.51 ns</td><td>170.96 ns</td><td>90.34 ns</td><td><strong>87.79 ns</strong></td><td>91.48 ns</td><td>96.26 ns</td><td>7.37</td><td>88.72 μs</td>
</tr>

<tr>
    <td>6</td><td>Map (symbol key)</td><td><pre lang="typescript"><code>
map.set(Symbol.for('abcdef'), value);
return map.get(Symbol.for('abcdef'));

</code></pre></td><td>90.86 ns</td><td>191.91 ns</td><td>100.02 ns</td><td><strong>97.80 ns</strong></td><td>101.90 ns</td><td>108.40 ns</td><td>8.24</td><td>98.21 μs</td>
</tr>

<tr>
    <td>7</td><td>Object</td><td><pre lang="typescript"><code>
obj['keywithalenght'] = value;
return obj['keywithalenght'];

</code></pre></td><td>62.98 ns</td><td>219.97 ns</td><td>111.19 ns</td><td><strong>113.45 ns</strong></td><td>115.31 ns</td><td>118.98 ns</td><td>9.30</td><td>109.19 μs</td>
</tr>

<tr>
    <td>8</td><td>Object (very long key)</td><td><pre lang="typescript"><code>
obj['something-else-everyon-ok-super-ultra'] = value;
return obj['something-else-everyon-ok-super-ultra'];

</code></pre></td><td>142.72 ns</td><td>261.13 ns</td><td>152.84 ns</td><td><strong>150.72 ns</strong></td><td>153.05 ns</td><td>157.42 ns</td><td>12.33</td><td>150.09 μs</td>
</tr>

<tr>
    <td>9</td><td>Map</td><td><pre lang="typescript"><code>
map.set('keywithalenght', value);
return map.get('keywithalenght');

</code></pre></td><td>42.48 ns</td><td>331.41 ns</td><td>160.97 ns</td><td><strong>168.60 ns</strong></td><td>173.56 ns</td><td>184.41 ns</td><td>14.08</td><td>158.07 μs</td>
</tr>

<tr>
    <td>10</td><td>Map (very long key)</td><td><pre lang="typescript"><code>
map.set('something-else-everyon-ok-super-ultra', value);
return map.get('something-else-everyon-ok-super-ultra');

</code></pre></td><td>187.74 ns</td><td>340.22 ns</td><td>205.50 ns</td><td><strong>201.38 ns</strong></td><td>208.73 ns</td><td>221.78 ns</td><td>16.90</td><td>201.81 μs</td>
</tr>

</table>

## If Else Return? (18884 laps, 2048 samples per lap)

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

</code></pre></td><td>188.96 ns</td><td>513.18 ns</td><td>198.76 ns</td><td style="color:green"><strong>194.09 ns</strong></td><td>196.87 ns</td><td>202.25 ns</td><td>1.00</td><td>3.75 ms</td>
</tr>

<tr>
    <td>2</td><td>If Multi return</td><td><pre lang="typescript"><code>

if (xxx)
  return a;
if (yyyy)
  return b;

</code></pre></td><td>188.33 ns</td><td>514.65 ns</td><td>198.91 ns</td><td><strong>194.14 ns</strong></td><td>196.97 ns</td><td>202.49 ns</td><td>1.00</td><td>3.76 ms</td>
</tr>

<tr>
    <td>3</td><td>If Else Multi return</td><td><pre lang="typescript"><code>

if (xxx)
  return a;
else if (yyyy)
  return b;

</code></pre></td><td>189.21 ns</td><td>467.48 ns</td><td>199.15 ns</td><td><strong>194.34 ns</strong></td><td>197.07 ns</td><td>202.93 ns</td><td>1.00</td><td>3.76 ms</td>
</tr>

</table>

## Set VS Regex VS In Object VS Object property (373 laps, 4096 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Object property</td><td><pre lang="typescript"><code>
if (obj['key']) { /* ... */ }
</code></pre></td><td>73.39 ns</td><td>1.06 μs</td><td>451.70 ns</td><td style="color:green"><strong>513.43 ns</strong></td><td>554.98 ns</td><td>575.76 ns</td><td>1.00</td><td>168.49 μs</td>
</tr>

<tr>
    <td>2</td><td>Object in</td><td><pre lang="typescript"><code>
if ('key' in obj) { /* ... */ }
</code></pre></td><td>73.29 ns</td><td>777.95 ns</td><td>450.32 ns</td><td><strong>513.72 ns</strong></td><td>556.20 ns</td><td>574.98 ns</td><td>1.00</td><td>167.97 μs</td>
</tr>

<tr>
    <td>3</td><td>Set</td><td><pre lang="typescript"><code>
const set = new Set([/* ... */]);
set.has('key')

</code></pre></td><td>2.55 μs</td><td>3.42 μs</td><td>3.08 μs</td><td><strong>3.09 μs</strong></td><td>3.13 μs</td><td>3.18 μs</td><td>5.71</td><td>1.15 ms</td>
</tr>

<tr>
    <td>4</td><td>Object hasOwnProperty</td><td><pre lang="typescript"><code>
if (obj.hasOwnProperty('key')) { /* ... */ }
</code></pre></td><td>3.24 μs</td><td>4.57 μs</td><td>3.70 μs</td><td><strong>3.76 μs</strong></td><td>3.80 μs</td><td>3.86 μs</td><td>6.94</td><td>1.38 ms</td>
</tr>

<tr>
    <td>5</td><td>Object.hasOwn</td><td><pre lang="typescript"><code>
if (Object.hasOwn(obj, 'key')) { /* ... */ }
</code></pre></td><td>4.14 μs</td><td>5.43 μs</td><td>4.63 μs</td><td><strong>4.69 μs</strong></td><td>4.74 μs</td><td>4.81 μs</td><td>8.66</td><td>1.73 ms</td>
</tr>

<tr>
    <td>6</td><td>RegExp</td><td><pre lang="typescript"><code>
const regex = /^(mul|div|sum|sub)$/;
regex.test('key')

</code></pre></td><td>7.52 μs</td><td>9.82 μs</td><td>8.06 μs</td><td><strong>8.09 μs</strong></td><td>8.15 μs</td><td>8.24 μs</td><td>14.89</td><td>3.01 ms</td>
</tr>

</table>

## Workers War (86 laps, 8 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>One Worker Eval</td><td><pre lang="typescript"><code>

const worker = new Worker('code'); each time worker.send

</code></pre></td><td>20.15 μs</td><td>70.64 μs</td><td>26.67 μs</td><td style="color:green"><strong>24.99 μs</strong></td><td>27.21 μs</td><td>33.38 μs</td><td>1.00</td><td>2.29 ms</td>
</tr>

<tr>
    <td>2</td><td>One Worker</td><td><pre lang="typescript"><code>

const worker = new Worker(); each time worker.send

</code></pre></td><td>24.74 μs</td><td>54.36 μs</td><td>31.89 μs</td><td><strong>30.47 μs</strong></td><td>33.82 μs</td><td>38.16 μs</td><td>1.20</td><td>2.74 ms</td>
</tr>

<tr>
    <td>3</td><td>new Worker Eval</td><td><pre lang="typescript"><code>

    new Worker('code') each time
    
</code></pre></td><td>19.48 ms</td><td>21.22 ms</td><td>20.11 ms</td><td><strong>20.15 ms</strong></td><td>20.30 ms</td><td>20.47 ms</td><td>711.85</td><td>1.73 sec.</td>
</tr>

<tr>
    <td>4</td><td>new Worker</td><td><pre lang="typescript"><code>

    new Worker() each time
    
</code></pre></td><td>21.68 ms</td><td>23.91 ms</td><td>22.63 ms</td><td><strong>22.61 ms</strong></td><td>22.88 ms</td><td>23.11 ms</td><td>801.72</td><td>1.95 sec.</td>
</tr>

</table>

## Dynamic Function VS Arrow Function (20497 laps, 16 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Anonymous</td><td><pre lang="typescript"><code>

samples.filter(f => {
  return f > 3 && f < 9;
});

</code></pre></td><td>21.08 μs</td><td>53.99 μs</td><td>22.73 μs</td><td style="color:green"><strong>21.86 μs</strong></td><td>22.17 μs</td><td>24.61 μs</td><td>1.00</td><td>465.84 ms</td>
</tr>

<tr>
    <td>2</td><td>Function</td><td><pre lang="typescript"><code>

samples.filter(function (f) {
  return f > 3 && f < 9;
});

</code></pre></td><td>21.09 μs</td><td>56.81 μs</td><td>23.05 μs</td><td><strong>22.19 μs</strong></td><td>22.54 μs</td><td>24.98 μs</td><td>1.02</td><td>472.47 ms</td>
</tr>

</table>

## Declared Function VS Dynamic (20343 laps, 16 samples per lap)

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
</code></pre></td><td>19.85 μs</td><td>58.66 μs</td><td>21.72 μs</td><td style="color:green"><strong>21.16 μs</strong></td><td>21.59 μs</td><td>22.36 μs</td><td>1.00</td><td>441.90 ms</td>
</tr>

<tr>
    <td>2</td><td>Declared function</td><td><pre lang="typescript"><code>
const declareFilter = (f: number) => {
        return f > 3 && f < 9;
      };
      // [...]
      samples.filter(declareFunctionFilter)
</code></pre></td><td>20.73 μs</td><td>63.57 μs</td><td>22.90 μs</td><td><strong>22.32 μs</strong></td><td>22.83 μs</td><td>23.58 μs</td><td>1.06</td><td>465.92 ms</td>
</tr>

<tr>
    <td>3</td><td>Dynamic function</td><td><pre lang="typescript"><code>
samples.filter(function (f) {
        return f > 3 && f < 9;
      })
</code></pre></td><td>21.51 μs</td><td>68.62 μs</td><td>23.36 μs</td><td><strong>22.84 μs</strong></td><td>23.16 μs</td><td>24.05 μs</td><td>1.08</td><td>475.19 ms</td>
</tr>

</table>

## Compose a string with `+` (plus) or with `${}` (interpolation)? (9342 laps, 64 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Interpolation</td><td><pre lang="typescript"><code>
`n°${i}\n`;

</code></pre></td><td>1.23 μs</td><td>6.01 μs</td><td>1.41 μs</td><td style="color:green"><strong>1.31 μs</strong></td><td>1.35 μs</td><td>1.47 μs</td><td>1.00</td><td>13.18 ms</td>
</tr>

<tr>
    <td>2</td><td>Plus operator</td><td><pre lang="typescript"><code>
'n°' + i + '\n';

</code></pre></td><td>1.23 μs</td><td>5.64 μs</td><td>1.41 μs</td><td><strong>1.31 μs</strong></td><td>1.35 μs</td><td>1.52 μs</td><td>1.01</td><td>13.18 ms</td>
</tr>

</table>

## Async Function VS Function (4517 laps, 8192 samples per lap)

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
</code></pre></td><td>6.92 ns</td><td>29.39 ns</td><td>7.63 ns</td><td style="color:green"><strong>7.56 ns</strong></td><td>7.57 ns</td><td>7.58 ns</td><td>1.00</td><td>34.46 μs</td>
</tr>

<tr>
    <td>2</td><td>Not async function (arrow)</td><td><pre lang="typescript"><code>
const notAsyncFunction = (ctx: ILapContext) => {
        return ctx.value || true;
      };
      
      notAsyncFunction(ctx);
</code></pre></td><td>6.60 ns</td><td>25.18 ns</td><td>7.63 ns</td><td><strong>7.57 ns</strong></td><td>7.58 ns</td><td>7.58 ns</td><td>1.00</td><td>34.46 μs</td>
</tr>

<tr>
    <td>3</td><td>Async function</td><td><pre lang="typescript"><code>
async function asyncFunction(ctx: ILapContext) {
  return ctx.value || true;
};

await asyncFunction(ctx);
</code></pre></td><td>39.27 ns</td><td>85.21 ns</td><td>43.96 ns</td><td><strong>41.67 ns</strong></td><td>42.46 ns</td><td>55.05 ns</td><td>6.13</td><td>198.55 μs</td>
</tr>

<tr>
    <td>4</td><td>Async function (arrow)</td><td><pre lang="typescript"><code>
const asyncFunction = async (ctx: ILapContext) => {
  return ctx.value || true;
};

await asyncFunction(ctx);
</code></pre></td><td>38.60 ns</td><td>89.62 ns</td><td>44.02 ns</td><td><strong>41.76 ns</strong></td><td>42.43 ns</td><td>54.86 ns</td><td>6.12</td><td>198.83 μs</td>
</tr>

<tr>
    <td>5</td><td>Promise function (arrow, without async keyword)</td><td><pre lang="typescript"><code>
function promiseFunction(ctx: ILapContext) {
  return Promise.resolve(ctx.value || true);
};

await promiseFunction(ctx);
</code></pre></td><td>41.71 ns</td><td>128.96 ns</td><td>46.63 ns</td><td><strong>44.31 ns</strong></td><td>45.08 ns</td><td>57.60 ns</td><td>6.47</td><td>210.61 μs</td>
</tr>

<tr>
    <td>6</td><td>Promise function (without async keyword)</td><td><pre lang="typescript"><code>
const promiseFunction = async (ctx: ILapContext) => {
        return Promise.resolve(ctx.value || true);
      };
      
      await promiseFunction(ctx);
</code></pre></td><td>41.81 ns</td><td>630.47 ns</td><td>46.77 ns</td><td><strong>44.34 ns</strong></td><td>45.08 ns</td><td>57.58 ns</td><td>6.47</td><td>211.24 μs</td>
</tr>

</table>

## Date.now() VS new Date().getTime() (22853 laps, 4096 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Date.now()</td><td><pre lang="typescript"><code>

time = Date.now();

</code></pre></td><td>49.90 ns</td><td>561.23 ns</td><td>53.97 ns</td><td style="color:green"><strong>53.27 ns</strong></td><td>53.52 ns</td><td>54.59 ns</td><td>1.00</td><td>1.23 ms</td>
</tr>

<tr>
    <td>2</td><td>new Date().getTime()</td><td><pre lang="typescript"><code>

time = new Date().getTime();

</code></pre></td><td>94.36 ns</td><td>272.85 ns</td><td>102.18 ns</td><td><strong>100.05 ns</strong></td><td>100.73 ns</td><td>102.83 ns</td><td>1.88</td><td>2.34 ms</td>
</tr>

</table>

## new Object() vs Curly braces ({}) (2295 laps, 1 samples per lap)

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

</code></pre></td><td>453.80 μs</td><td>4.32 ms</td><td>677.28 μs</td><td style="color:green"><strong>538.60 μs</strong></td><td>554.10 μs</td><td>634.40 μs</td><td>1.00</td><td>1.55 sec.</td>
</tr>

<tr>
    <td>2</td><td>Curly braces {}</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, {});
}

</code></pre></td><td>466.80 μs</td><td>7.83 ms</td><td>718.86 μs</td><td><strong>543.70 μs</strong></td><td>560.30 μs</td><td>709.80 μs</td><td>1.05</td><td>1.65 sec.</td>
</tr>

<tr>
    <td>3</td><td>Object.create({})</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, Object.create());
}

</code></pre></td><td>2.74 ms</td><td>13.45 ms</td><td>3.92 ms</td><td><strong>3.12 ms</strong></td><td>4.92 ms</td><td>5.60 ms</td><td>7.90</td><td>8.99 sec.</td>
</tr>

</table>

## alphanum fight (222 laps, 1 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>/^[a-z0-9]+$/gi</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, regex2.test);
}

</code></pre></td><td>18.00 ms</td><td>30.23 ms</td><td>21.00 ms</td><td style="color:green"><strong>18.76 ms</strong></td><td>26.10 ms</td><td>26.85 ms</td><td>1.00</td><td>4.66 sec.</td>
</tr>

<tr>
    <td>2</td><td>/^[a-zA-Z0-9]+$/g</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
const regex = /[a-zA-Z0-9]/g;
for (let i = 0; i < 10000; i++) {
  map.set(i, regex.test(crypto.randomBytes(20).toString('hex')));
}
return map;

</code></pre></td><td>18.02 ms</td><td>34.61 ms</td><td>21.03 ms</td><td><strong>18.78 ms</strong></td><td>26.06 ms</td><td>27.08 ms</td><td>1.00</td><td>4.67 sec.</td>
</tr>

<tr>
    <td>3</td><td>checkString if</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, checkString);
}

</code></pre></td><td>18.73 ms</td><td>33.16 ms</td><td>21.75 ms</td><td><strong>19.59 ms</strong></td><td>26.76 ms</td><td>27.45 ms</td><td>1.03</td><td>4.83 sec.</td>
</tr>

<tr>
    <td>4</td><td>checkString dumb</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, checkStringDumb);
}

</code></pre></td><td>22.15 ms</td><td>33.29 ms</td><td>25.21 ms</td><td><strong>23.04 ms</strong></td><td>30.16 ms</td><td>31.04 ms</td><td>1.17</td><td>5.60 sec.</td>
</tr>

<tr>
    <td>5</td><td>checkString Object</td><td><pre lang="typescript"><code>

const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, checkStringObject);
}

</code></pre></td><td>24.05 ms</td><td>42.46 ms</td><td>27.12 ms</td><td><strong>24.89 ms</strong></td><td>32.16 ms</td><td>32.93 ms</td><td>1.25</td><td>6.02 sec.</td>
</tr>

</table>

## Cost of try catch (48 laps, 8192 samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Without try/catch</td><td><pre lang="typescript"><code>

for (let i = 0; i < samples.length; i++) {
  // Without try catch
}

</code></pre></td><td>10.67 ns</td><td>14.76 ns</td><td>11.74 ns</td><td style="color:green"><strong>11.57 ns</strong></td><td>12.04 ns</td><td>12.26 ns</td><td>1.00</td><td>563.46 ns</td>
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

</code></pre></td><td>10.41 ns</td><td>16.85 ns</td><td>11.89 ns</td><td><strong>11.87 ns</strong></td><td>11.93 ns</td><td>12.15 ns</td><td>1.00</td><td>570.87 ns</td>
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

</code></pre></td><td>13.48 ns</td><td>16.46 ns</td><td>14.37 ns</td><td><strong>14.15 ns</strong></td><td>14.23 ns</td><td>15.38 ns</td><td>1.22</td><td>689.54 ns</td>
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

</code></pre></td><td>29.82 μs</td><td>123.61 μs</td><td>118.18 μs</td><td><strong>121.99 μs</strong></td><td>122.68 μs</td><td>123.23 μs</td><td>10258.31</td><td>5.67 ms</td>
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

</code></pre></td><td>36.87 μs</td><td>153.88 μs</td><td>147.19 μs</td><td><strong>151.95 μs</strong></td><td>152.49 μs</td><td>153.59 μs</td><td>12771.08</td><td>7.07 ms</td>
</tr>

</table>

