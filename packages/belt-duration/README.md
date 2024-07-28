[![npm version](https://img.shields.io/npm/v/@aegenet/belt-duration.svg)](https://www.npmjs.com/package/@aegenet/belt-duration)
<br>

# @aegenet/belt-duration

> Helps to convert or format durations

## 💾 Installation

```shell
yarn add @aegenet/belt-duration@^1.6.0
# or
npm i @aegenet/belt-duration@^1.6.0
```

## 📝 Usage

```typescript
import { toDuration, EDurationFormat, EDurationFormatMask } from '@aegenet/belt-duration';

toDuration(12.5, EDurationFormat.MONTHS);

{
  daysPerWeek: 7,
  hoursPerDay: 24,

  years: 1,
  months: 0,
  weeks: 2,
  days: 1,
  hours: 5,
  milliseconds: 576,
  minutes: 0,
  seconds: 0,
}

// 9999999999ms to Weeks days and hours
toDuration(9999999999, EDurationFormat.MILLISECONDS, {
  mask: EDurationFormatMask.W_D_H,
});

// 16 weeks, 3 days and 18 hours
{
  daysPerWeek: 7,
  hoursPerDay: 24,

  years: 0,
  months: 0,
  weeks: 16,
  days: 3,
  hours: 18,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
}

// 9999999999ms to Weeks days and hours, with 5 days per week, 8 hours per day
toDuration(9999999999, EDurationFormat.MILLISECONDS, {
  mask: EDurationFormatMask.W_D_H,
  daysPerWeek: 5,
  hoursPerDay: 8,
});

// 69 weeks, 2 days and 2 hours
{
  daysPerWeek: 5,
  hoursPerDay: 8,

  years: 0,
  months: 0,
  weeks: 69,
  days: 2,
  hours: 2,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
}
```
