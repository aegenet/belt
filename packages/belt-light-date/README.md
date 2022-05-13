# @aegenet/belt-light-date

> (Very) light `Date` tools

## LightDate

```typescript
import { LightDate } from '@aegenet/belt-light-date';

// today
LightDate.today(); // Like new Date()
LightDate.today('2022-04-20T12:14:00.072Z'); // new Date('2022-04-20T12:14:00.072Z')

/**
 * Today at 00:00:00 (current language)
 * @remark It's not a UTC midight
 */
LightDate.todayStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '20/04/2022, 00:00:00'

// todayEnd
LightDate.todayEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '20/04/2022, 23:59:59'

// tomorrow
LightDate.tomorrow('2022-04-20T12:14:00.072Z').toISOString(); // '2022-04-21T12:14:00.072Z'

// yesterday
LightDate.yesterday('2022-04-20T12:14:00.072Z').toISOString(); // '2022-04-19T12:14:00.072Z'

// tomorrowStart
LightDate.tomorrowStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '21/04/2022, 00:00:00'

// tomorrowEnd
LightDate.tomorrowEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '21/04/2022, 23:59:59'

// monthStart
LightDate.monthStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '01/04/2022, 00:00:00'

// monthEnd
LightDate.monthEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '30/04/2022, 23:59:59'

// weekStart
LightDate.weekStart('2022-04-20T12:14:00.072Z', 'fr-FR').toLocaleString('fr'); // '18/04/2022, 00:00:00'
LightDate.weekStart('2022-04-20T12:14:00.072Z', 'en-US').toLocaleString('fr'); // '17/04/2022, 00:00:00'

// weekEnd
LightDate.weekEnd('2022-04-20T12:14:00.072Z', 'fr-FR').toLocaleString('fr'); // '24/04/2022, 23:59:59'
LightDate.weekEnd('2022-04-20T12:14:00.072Z', 'en-US').toLocaleString('fr'); // '23/04/2022, 23:59:59'

// nextMonthStart
LightDate.nextMonthStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '01/05/2022, 00:00:00'

// nextMonthEnd
LightDate.nextMonthEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '31/05/2022, 23:59:59'

// prevMonthStart
LightDate.prevMonthStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '01/03/2022, 00:00:00'

// prevMonthEnd
LightDate.prevMonthEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '31/03/2022, 23:59:59'

// Split date
const splited = LightDate.splitDate({
  days: 365,
  dateFrom: '2022-04-20T12:14:00.072Z',
  startEndOf: 'week',
});

splited.start.toLocaleString('fr'); // '18/10/2021, 00:00:00'
splited.end.toLocaleString('fr'); // '23/10/2022, 23:59:59'

// Get current locale
getIntlLocale(); // Object
```

## getDayNames

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

## getMonthNames

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