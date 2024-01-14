[![npm version](https://img.shields.io/npm/v/@aegenet/belt-rows-inflator.svg)](https://www.npmjs.com/package/@aegenet/belt-rows-inflator)
<br>

# @aegenet/belt-rows-inflator

> Rows Inflator, transforms SQL results into nested objects

```typescript
import { rowsInflator, ERowsInflatorAssociation } from '@aegenet/belt-rows-inflator';

const raws = [
  { id: 1, code: 'Luna', users__id: 1, users__code: 'wismerhill', users__subordinates__id: 3, users__subordinates__code: 'maurel' },
  { id: 2, code: 'Sun', users__id: 2, users__code: 'pileouface', users__subordinates__id: null, users__subordinates__code: null },
  { id: 1, code: 'Luna', users__id: 3, users__code: 'maurel', users__subordinates__id: null, users__subordinates__code: null },
];

const results = rowsInflator(raws, {
  as: 'company',
  fields: {
    code: {},
    id: {},
  },
  associations: {
    users: {
      as: 'users',
      associationType: ERowsInflatorAssociation.hasMany,
      fields: {
        code: {},
        id: {},
      },
      associations: {
        subordinates: {
          as: 'subordinates',
          associationType: ERowsInflatorAssociation.hasMany,
          fields: {
            code: {},
            id: {},
          },
        },
      },
    },
  },
});

```

Results

```json
[
  {
    "code": "Luna",
    "id": 1,
    "users": [
      {
        "code": "wismerhill",
        "id": 1,
        "subordinates": [
          {
            "code": "maurel",
            "id": 3
          }
        ]
      },
      {
        "code": "maurel",
        "id": 3
      }
    ]
  },
  {
    "code": "Sun",
    "id": 2,
    "users": [
      {
        "code": "pileouface",
        "id": 2
      }
    ]
  }
]
```
