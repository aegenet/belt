[![npm version](https://img.shields.io/npm/v/@aegenet/belt-light-date.svg)](https://www.npmjs.com/package/@aegenet/belt-light-date)
<br>

# @aegenet/belt-light-date

> (Very) light `Date` tools

## 💾 Installation

```shell
yarn add @aegenet/belt-light-date@^1.2.0
# or
npm i @aegenet/belt-light-date@^1.2.0
```

## 📝 Usage

### LightDate

```typescript
import { lightDate } from '@aegenet/belt-light-date';

// today
lightDate.today(); // Like new Date()
lightDate.today('2022-04-20T12:14:00.072Z'); // new Date('2022-04-20T12:14:00.072Z')

/**
 * Today at 00:00:00 (current language)
 * @remark It's not a UTC midight
 */
lightDate.todayStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '20/04/2022, 00:00:00'

// todayEnd
lightDate.todayEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '20/04/2022, 23:59:59'

// tomorrow
lightDate.tomorrow('2022-04-20T12:14:00.072Z').toISOString(); // '2022-04-21T12:14:00.072Z'

// yesterday
lightDate.yesterday('2022-04-20T12:14:00.072Z').toISOString(); // '2022-04-19T12:14:00.072Z'

// tomorrowStart
lightDate.tomorrowStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '21/04/2022, 00:00:00'

// tomorrowEnd
lightDate.tomorrowEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '21/04/2022, 23:59:59'

// monthStart
lightDate.monthStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '01/04/2022, 00:00:00'

// monthEnd
lightDate.monthEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '30/04/2022, 23:59:59'

// weekStart
lightDate.weekStart('2022-04-20T12:14:00.072Z', 'fr-FR').toLocaleString('fr'); // '18/04/2022, 00:00:00'
lightDate.weekStart('2022-04-20T12:14:00.072Z', 'en-US').toLocaleString('fr'); // '17/04/2022, 00:00:00'

// weekEnd
lightDate.weekEnd('2022-04-20T12:14:00.072Z', 'fr-FR').toLocaleString('fr'); // '24/04/2022, 23:59:59'
lightDate.weekEnd('2022-04-20T12:14:00.072Z', 'en-US').toLocaleString('fr'); // '23/04/2022, 23:59:59'

// nextMonthStart
lightDate.nextMonthStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '01/05/2022, 00:00:00'

// nextMonthEnd
lightDate.nextMonthEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '31/05/2022, 23:59:59'

// prevMonthStart
lightDate.prevMonthStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '01/03/2022, 00:00:00'

// prevMonthEnd
lightDate.prevMonthEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '31/03/2022, 23:59:59'

// Get current locale
getIntlLocale(); // Object
```

### isLeapYear

```typescript
import { isLeapYear } from '@aegenet/belt-light-date';
isLeapYear(2000); // true
isLeapYear(2001); // false
isLeapYear(2019); // false
isLeapYear(2020); // true
isLeapYear(2021); // false
isLeapYear(2024); // true
isLeapYear(2027); // false
```

### getDaysArrayInMonth

```typescript
import { getDaysArrayInMonth } from '@aegenet/belt-light-date';
getDaysArrayInMonth(2021); // [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
getDaysArrayInMonth(2020); // [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
```

### getDaysInMonth

```typescript
import { getDaysInMonth } from '@aegenet/belt-light-date';

getDaysInMonth(new Date(2019, 0)); // 31
getDaysInMonth(new Date(2021, 1)); // 28
getDaysInMonth(new Date(2020, 0)); // 31
getDaysInMonth(new Date(2020, 1)); // 29
```

### getDayNames

```typescript
import { getDayNames } from '@aegenet/belt-light-date';

getDayNames();
// Long & Default locale
// ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

getDayNames('short');
// Default locale
// ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

getDayNames('short', 'en');
// ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
getDayNames('long', 'en');
// ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  
getDayNames('long', 'fr');
// ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']);
```

### getMonthNames

```typescript
import { getMonthNames } from '@aegenet/belt-light-date';

getMonthNames();
// long & default locale
// ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

getMonthNames('short');
// default locale
// ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

getMonthNames('short', 'en');
// ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

getMonthNames('long', 'en');
// ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

getMonthNames('long', 'fr');
// ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']

```

### splitDate

```typescript
import { splitDate } from '@aegenet/belt-light-date';

// Split date
const splited = splitDate({
  days: 365,
  dateFrom: '2022-04-20T12:14:00.072Z',
  startEndOf: 'week',
});

splited.start.toLocaleString('fr'); // '18/10/2021, 00:00:00'
splited.end.toLocaleString('fr'); // '23/10/2022, 23:59:59'
```

### Input date utils

```typescript
import { dateToInputDate, inputDateToDate } from '@aegenet/belt-light-date';

// Convert a Date to an compatible input date string
dateToInputDate(new Date()); // YYYY-MM-dd

// Convert back a input date string to a Date object
inputDateToDate('YYYY-MM-dd'); // Date object
```

### Input date time utils

```typescript
import { dateToInputDateTime, inputDateTimeToDate } from '@aegenet/belt-light-date';

// Convert a Date to an compatible input date time string
dateToInputDateTime(new Date()); // YYYY-MM-ddTHH:mm

// Convert back a input date time string to a Date object
inputDateToDate('YYYY-MM-ddTHH:mm'); // Date object
```

### getCurrentTimezone

```typescript
import { getCurrentTimezone } from '@aegenet/belt-light-date';

// Get current timezone
getCurrentTimezone(); // +0200
```
