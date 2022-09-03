# Benchmark Node.js v16.14.0

## War of Loop (100000 laps)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>for i</td><td><pre lang="typescript">

for (let i = 0; i < samples.length; i++) {
  // [...]
}
</pre></td><td>99.90 ns</td><td>1.45 ms</td><td>157.90 ns</td><td>100.02 ns</td><td>199.91 ns</td><td>200.03 ns</td><td>1.00</td><td>15.79 ms</td>
</tr>

<tr>
    <td>2</td><td>while</td><td><pre lang="typescript">

let i = 0;
while (i < samples.length) {
  // [...]
  i++;
}
</pre></td><td>99.90 ns</td><td>1.72 ms</td><td>254.35 ns</td><td>100.02 ns</td><td>199.91 ns</td><td>200.03 ns</td><td>1.00</td><td>25.43 ms</td>
</tr>

<tr>
    <td>3</td><td>forEach</td><td><pre lang="typescript">

samples.forEach(val => {
  // [...]
});
</pre></td><td>99.90 ns</td><td>464.20 μs</td><td>156.39 ns</td><td>100.02 ns</td><td>200.03 ns</td><td>200.03 ns</td><td>1.00</td><td>15.64 ms</td>
</tr>

<tr>
    <td>4</td><td>for of</td><td><pre lang="typescript">

for (const val of samples) {
  // [...]
}
</pre></td><td>99.90 ns</td><td>1.25 ms</td><td>182.21 ns</td><td>100.02 ns</td><td>200.03 ns</td><td>200.03 ns</td><td>1.00</td><td>18.22 ms</td>
</tr>

</table>

## Loop Key,Value from an object (100000 laps)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>for in</td><td><pre lang="typescript">

for (const key in samples) {
  // ...
}
</pre></td><td>299.93 ns</td><td>1.05 ms</td><td>504.32 ns</td><td>400.07 ns</td><td>400.07 ns</td><td>500.08 ns</td><td>1.00</td><td>50.43 ms</td>
</tr>

<tr>
    <td>2</td><td>Object.keys() + for i</td><td><pre lang="typescript">

const keys = Object.keys(samples);
for (let i = 0; i < keys.length; i++) {
  // ...
}
</pre></td><td>399.95 ns</td><td>1.15 ms</td><td>573.70 ns</td><td>499.96 ns</td><td>500.08 ns</td><td>599.98 ns</td><td>1.23</td><td>57.37 ms</td>
</tr>

<tr>
    <td>3</td><td>for of Object.keys()</td><td><pre lang="typescript">

for (const key of Object.keys(samples)) {
  // ...
}
</pre></td><td>399.95 ns</td><td>1.07 ms</td><td>582.59 ns</td><td>499.96 ns</td><td>500.08 ns</td><td>599.98 ns</td><td>1.23</td><td>58.26 ms</td>
</tr>

<tr>
    <td>4</td><td>Object.keys().forEach</td><td><pre lang="typescript">

Object.keys(samples).forEach(key => {
  // ...
});
</pre></td><td>399.95 ns</td><td>1.65 ms</td><td>632.01 ns</td><td>499.96 ns</td><td>500.08 ns</td><td>599.98 ns</td><td>1.23</td><td>63.20 ms</td>
</tr>

<tr>
    <td>5</td><td>for of Object.entries()</td><td><pre lang="typescript">

for (const [key, value] of Object.entries(samples)) {
  // ...
}
</pre></td><td>399.95 ns</td><td>2.83 ms</td><td>711.59 ns</td><td>499.96 ns</td><td>500.08 ns</td><td>599.98 ns</td><td>1.23</td><td>71.16 ms</td>
</tr>

</table>

## Declare in loop or not (100000 laps)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>No var</td><td><pre lang="typescript">

const map = new Map<number, number>();
for (let i = 0; i < 100; i++) {
  map.set(i, i * 5);
}
</pre></td><td>2.00 μs</td><td>94.50 μs</td><td>2.41 μs</td><td>2.20 μs</td><td>2.40 μs</td><td>3.00 μs</td><td>1.00</td><td>240.75 ms</td>
</tr>

<tr>
    <td>2</td><td>let out loop</td><td><pre lang="typescript">

const map = new Map<number, number>();
let myVarOutLoop: number;
for (let i = 0; i < 100; i++) {
  myVarOutLoop = i * 5;
  map.set(i, myVarOutLoop);
}
</pre></td><td>2.00 μs</td><td>150.60 μs</td><td>2.55 μs</td><td>2.40 μs</td><td>2.60 μs</td><td>3.20 μs</td><td>1.08</td><td>254.92 ms</td>
</tr>

<tr>
    <td>3</td><td>const in loop</td><td><pre lang="typescript">

const map = new Map<number, number>();
for (let i = 0; i < 10000; i++) {
  const myVarInLoop = i * 5;
  map.set(i, myVarInLoop);
}
</pre></td><td>414.50 μs</td><td>4.43 ms</td><td>521.77 μs</td><td>453.70 μs</td><td>484.30 μs</td><td>585.80 μs</td><td>200.50</td><td>52.18 sec.</td>
</tr>

</table>

## Join a string with an array or with +=? (100000 laps)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>+=</td><td><pre lang="typescript">

let something = 'Hello
';
// ...
something += ' Mister';
</pre></td><td>75.90 μs</td><td>3.23 ms</td><td>82.53 μs</td><td>79.70 μs</td><td>80.50 μs</td><td>85.40 μs</td><td>1.00</td><td>8.25 sec.</td>
</tr>

<tr>
    <td>2</td><td>array push join</td><td><pre lang="typescript">

const strArray: string[] = [];
strArray.push('Hello');
strArray.push(' Mister');
const str = strArray.join();
</pre></td><td>211.10 μs</td><td>3.70 ms</td><td>267.34 μs</td><td>227.30 μs</td><td>231.70 μs</td><td>270.40 μs</td><td>2.97</td><td>26.73 sec.</td>
</tr>

</table>

## Map VS Object VS switch VS if (100000 laps)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>If</td><td><pre lang="typescript">
if (key === 'a') { return something }</pre></td><td>299.93 ns</td><td>148.30 μs</td><td>399.17 ns</td><td>399.95 ns</td><td>400.07 ns</td><td>400.07 ns</td><td>1.00</td><td>39.92 ms</td>
</tr>

<tr>
    <td>2</td><td>Switch</td><td><pre lang="typescript">
switch (key)</pre></td><td>299.93 ns</td><td>1.80 ms</td><td>528.56 ns</td><td>399.95 ns</td><td>400.07 ns</td><td>499.96 ns</td><td>1.08</td><td>52.86 ms</td>
</tr>

<tr>
    <td>3</td><td>Map</td><td><pre lang="typescript">
map.get(key)</pre></td><td>399.95 ns</td><td>4.12 ms</td><td>555.36 ns</td><td>499.96 ns</td><td>500.08 ns</td><td>599.98 ns</td><td>1.33</td><td>55.54 ms</td>
</tr>

<tr>
    <td>4</td><td>Object</td><td><pre lang="typescript">
obj[key]</pre></td><td>399.95 ns</td><td>1.32 ms</td><td>560.03 ns</td><td>499.96 ns</td><td>500.08 ns</td><td>599.98 ns</td><td>1.33</td><td>56.00 ms</td>
</tr>

</table>

## If Else Return? (100000 laps)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>If Else Multi return</td><td><pre lang="typescript">

if (xxx)
  return a;
else if (yyyy)
  return b;
</pre></td><td>299.93 ns</td><td>1.33 ms</td><td>413.01 ns</td><td>399.95 ns</td><td>400.07 ns</td><td>499.96 ns</td><td>1.00</td><td>41.30 ms</td>
</tr>

<tr>
    <td>2</td><td>If Multi return</td><td><pre lang="typescript">

if (xxx)
  return a;
if (yyyy)
  return b;
</pre></td><td>299.93 ns</td><td>1.36 ms</td><td>417.66 ns</td><td>399.95 ns</td><td>400.07 ns</td><td>499.96 ns</td><td>1.00</td><td>41.77 ms</td>
</tr>

<tr>
    <td>3</td><td>If Else One return</td><td><pre lang="typescript">

let result;
if (xxx)
  result = a;
else if (yyyy)
  result = b;

return result;
</pre></td><td>299.93 ns</td><td>3.64 ms</td><td>456.70 ns</td><td>399.95 ns</td><td>400.07 ns</td><td>499.96 ns</td><td>1.00</td><td>45.67 ms</td>
</tr>

</table>

## Set VS Regex VS In Object VS Object property (100000 laps)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Object in</td><td><pre lang="typescript">
if ('key' in obj) { /* ... */ }</pre></td><td>399.95 ns</td><td>778.25 ms</td><td>11.76 μs</td><td>700.00 ns</td><td>800.01 ns</td><td>900.03 ns</td><td>1.00</td><td>1.18 sec.</td>
</tr>

<tr>
    <td>2</td><td>Object property</td><td><pre lang="typescript">
if (obj['key']) { /* ... */ }</pre></td><td>399.95 ns</td><td>14.43 ms</td><td>4.87 μs</td><td>800.01 ns</td><td>800.01 ns</td><td>900.03 ns</td><td>1.04</td><td>487.15 ms</td>
</tr>

<tr>
    <td>3</td><td>Set</td><td><pre lang="typescript">
const set = new Set([/* ... */]);
set.has('key')
</pre></td><td>5.20 μs</td><td>16.28 ms</td><td>20.92 μs</td><td>5.60 μs</td><td>5.70 μs</td><td>6.80 μs</td><td>7.54</td><td>2.09 sec.</td>
</tr>

<tr>
    <td>4</td><td>RegExp</td><td><pre lang="typescript">
const regex = /^(mul|div|sum|sub)$/;
regex.test('key')
</pre></td><td>8.40 μs</td><td>155.34 ms</td><td>26.94 μs</td><td>9.30 μs</td><td>9.50 μs</td><td>11.50 μs</td><td>12.62</td><td>2.69 sec.</td>
</tr>

</table>

## Dynamic Function VS Arrow Function (100000 laps)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Function</td><td><pre lang="typescript">

samples.filter(function (f) {
  return f > 3 && f < 9;
});
</pre></td><td>20.70 μs</td><td>16.53 ms</td><td>43.33 μs</td><td>21.80 μs</td><td>22.20 μs</td><td>24.90 μs</td><td>1.00</td><td>4.33 sec.</td>
</tr>

<tr>
    <td>2</td><td>Anonymous</td><td><pre lang="typescript">

samples.filter(f => {
  return f > 3 && f < 9;
});
</pre></td><td>20.50 μs</td><td>1.24 sec.</td><td>58.89 μs</td><td>22.00 μs</td><td>22.30 μs</td><td>24.80 μs</td><td>1.00</td><td>5.89 sec.</td>
</tr>

</table>

## Declared Function VS Dynamic (100000 laps)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>

<tr>
    <td>1</td><td>Declared function</td><td><pre lang="typescript">
const declareFilter = (f: number) => {
        return f > 3 && f < 9;
      };
      // [...]
      samples.filter(declareFunctionFilter)</pre></td><td>19.80 μs</td><td>15.72 ms</td><td>42.84 μs</td><td>20.90 μs</td><td>21.20 μs</td><td>24.80 μs</td><td>1.00</td><td>4.28 sec.</td>
</tr>

<tr>
    <td>2</td><td>Declared arrow function</td><td><pre lang="typescript">
function declareFunctionFilter(f: number) {
        return f > 3 && f < 9;
      }
      // [...]
      samples.filter(declareFunctionFilter)</pre></td><td>19.80 μs</td><td>717.84 ms</td><td>50.06 μs</td><td>21.10 μs</td><td>21.40 μs</td><td>24.90 μs</td><td>1.01</td><td>5.01 sec.</td>
</tr>

<tr>
    <td>3</td><td>Dynamic function</td><td><pre lang="typescript">
samples.filter(function (f) {
        return f > 3 && f < 9;
      })</pre></td><td>20.60 μs</td><td>838.75 ms</td><td>54.53 μs</td><td>21.50 μs</td><td>21.90 μs</td><td>25.60 μs</td><td>1.03</td><td>5.45 sec.</td>
</tr>

</table>

