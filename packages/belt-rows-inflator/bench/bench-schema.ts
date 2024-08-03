import { ERowsInflatorAssociation, type IRowsInflatorOptions } from '../src/index';
import * as fs from 'node:fs';
import path from 'node:path';

export const rowsMergerSchemaWithPK = {
  as: 'company',
  fields: {
    code: {},
    id: {},
  },
  primaryKeys: ['id'],
  associations: {
    users: {
      as: 'users',
      associationType: ERowsInflatorAssociation.hasMany,
      fields: {
        code: {} as any,
        id: {} as any,
      },
      primaryKeys: ['id'],
      associations: {
        subordinates: {
          as: 'subordinates',
          associationType: ERowsInflatorAssociation.hasMany,
          fields: {
            code: {} as any,
            id: {} as any,
          },
          targetKey: 'responsible_id',
          primaryKeys: ['id'],
        },
        company: {
          as: 'company',
          fields: {
            code: {} as any,
            id: {} as any,
          },
          primaryKeys: ['id'],
          sourceKey: 'company_id',
          targetKey: 'id',
          associationType: ERowsInflatorAssociation.belongsTo,
        },
      },
    },
  },
} as IRowsInflatorOptions;

export const rowsMergerSchema = {
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
        code: {} as any,
        id: {} as any,
      },
      associations: {
        subordinates: {
          as: 'subordinates',
          associationType: ERowsInflatorAssociation.hasMany,
          fields: {
            code: {} as any,
            id: {} as any,
          },
        },
        company: {
          as: 'company',
          fields: {
            code: {} as any,
            id: {} as any,
          },
          sourceKey: 'company_id',
          targetKey: 'id',
          associationType: ERowsInflatorAssociation.belongsTo,
        },
      },
    },
  },
} as IRowsInflatorOptions;

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const raws: any[] = fs.existsSync(path.join(__dirname, './../../../static/sample.json'))
  ? require(path.join(__dirname, './../../../static/sample.json'))
  : require('./../static/sample.json');
