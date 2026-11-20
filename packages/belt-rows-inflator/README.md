[![npm version](https://img.shields.io/npm/v/@aegenet/belt-rows-inflator.svg)](https://www.npmjs.com/package/@aegenet/belt-rows-inflator)
<br>

# @aegenet/belt-rows-inflator

> Rows Inflator, transforms SQL results into nested objects

## 💾 Installation

```shell
yarn add @aegenet/belt-rows-inflator@^2.0.0
# or
npm i @aegenet/belt-rows-inflator@^2.0.0
```

## 📝 Usage

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

## Option `emptyWhenAbsent`

An outer join (`LEFT JOIN`) that matched no child row makes that association level map to nothing — and by
default the key is then **never created** on the parent, which forces every consumer to test
`'users' in row`.

Set `emptyWhenAbsent: true` on an **association** level to always expose it, the empty value following the
cardinality of the association:

- `[]` for a plural one (`hasMany` / `belongsToMany`),
- `null` for a singular one (`hasOne` / `belongsTo`).

```typescript
associations: {
  users: {
    as: 'users',
    associationType: ERowsInflatorAssociation.hasMany,
    emptyWhenAbsent: true, // "users": [] when the join matched nothing
    fields: { code: {}, id: {} },
  },
},
```

Guarantees: it never attaches anything to an ancestor that already missed on the same row (nested outer
joins), and it never invents a root row out of an all-null one.
