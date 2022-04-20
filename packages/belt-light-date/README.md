# @aegenet/belt-light-date

> (Very) light `Date` tools

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

// nextMonthStart
LightDate.nextMonthStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '01/05/2022, 00:00:00'

// nextMonthEnd
LightDate.nextMonthEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '31/05/2022, 23:59:59'

// prevMonthStart
LightDate.prevMonthStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '01/03/2022, 00:00:00'

// prevMonthEnd
LightDate.prevMonthEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'); // '31/03/2022, 23:59:59'

```
