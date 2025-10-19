/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { ERowsInflatorAssociation, type IRowsInflatorOptions, rowsInflator } from './../index';

describe('rows-inflator', () => {
  const rowsMergerSchema = {
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
      address: {
        as: 'address',
        fields: {
          code: {} as any,
          id: {} as any,
        },
        sourceKey: 'address_id',
        targetKey: 'id',
        associationType: ERowsInflatorAssociation.hasOne,
      },
    },
  } as IRowsInflatorOptions;

  it('null', () => {
    const results = rowsInflator(null as any, rowsMergerSchema);
    assert.strictEqual(results.length, 0);
  });

  it('empty', () => {
    const results = rowsInflator([], rowsMergerSchema);
    assert.strictEqual(results.length, 0);
  });

  it('Nested many', () => {
    const raws: any[] = [
      {
        id: 1,
        code: 'Luna',
        users__id: 1,
        users__code: 'wismerhill',
        users__subordinates__id: 3,
        users__subordinates__code: 'maurel',
      },
      {
        id: 2,
        code: 'Sun',
        users__id: 2,
        users__code: 'pileouface',
        users__subordinates__id: null,
        users__subordinates__code: null,
      },
      {
        id: 1,
        code: 'Luna',
        users__id: 3,
        users__code: 'maurel',
        users__subordinates__id: null,
        users__subordinates__code: null,
      },
    ];
    const results = rowsInflator(raws, rowsMergerSchema);

    assert.strictEqual(results.length, 2);
    assert.strictEqual(results[0].id, 1);
    assert.strictEqual(results[0].code, 'Luna');
    assert.strictEqual(results[0].users.length, 2);
    assert.strictEqual(results[0].users[0].id, 1);
    assert.strictEqual(results[0].users[0].code, 'wismerhill');
    assert.strictEqual(results[0].users[0].subordinates.length, 1);
    assert.strictEqual(results[0].users[0].subordinates[0].id, 3);
    assert.strictEqual(results[0].users[0].subordinates[0].code, 'maurel');
    assert.strictEqual(results[0].users[0].code, 'wismerhill');
    assert.strictEqual(results[0].users[1].id, 3);
    assert.strictEqual(results[0].users[1].code, 'maurel');
    assert.strictEqual(results[1].id, 2);
    assert.strictEqual(results[1].code, 'Sun');
    assert.strictEqual(results[1].users.length, 1);
    assert.strictEqual(results[1].users[0].id, 2);
    assert.strictEqual(results[1].users[0].code, 'pileouface');
  });

  it('Nested many and Same subordinates', () => {
    const raws: any[] = [
      {
        id: 1,
        code: 'Luna',
        users__id: 1,
        users__code: 'wismerhill',
        users__subordinates__id: 3,
        users__subordinates__code: 'maurel',
      },
      {
        id: 1,
        code: 'Luna',
        users__id: 1,
        users__code: 'wismerhill',
        users__subordinates__id: 4,
        users__subordinates__code: 'apower',
      },
      {
        id: 2,
        code: 'Sun',
        users__id: 2,
        users__code: 'pileouface',
        users__subordinates__id: 3,
        users__subordinates__code: 'maurel',
      },
      {
        id: 1,
        code: 'Luna',
        users__id: 3,
        users__code: 'maurel',
        users__subordinates__id: null,
        users__subordinates__code: null,
      },
    ];
    const results = rowsInflator(raws, rowsMergerSchema);

    assert.strictEqual(results.length, 2);
    assert.strictEqual(results[0].id, 1);
    assert.strictEqual(results[0].code, 'Luna');
    assert.strictEqual(results[0].users.length, 2);
    assert.strictEqual(results[0].users[0].id, 1);
    assert.strictEqual(results[0].users[0].code, 'wismerhill');
    assert.strictEqual(results[0].users[0].subordinates.length, 2);
    assert.strictEqual(results[0].users[0].subordinates[0].id, 3);
    assert.strictEqual(results[0].users[0].subordinates[0].code, 'maurel');
    assert.strictEqual(results[0].users[0].subordinates[1].id, 4);
    assert.strictEqual(results[0].users[0].subordinates[1].code, 'apower');
    assert.strictEqual(results[0].users[0].code, 'wismerhill');
    assert.strictEqual(results[0].users[1].id, 3);
    assert.strictEqual(results[0].users[1].code, 'maurel');
    assert.strictEqual(results[1].id, 2);
    assert.strictEqual(results[1].code, 'Sun');
    assert.strictEqual(results[1].users.length, 1);
    assert.strictEqual(results[1].users[0].id, 2);
    assert.strictEqual(results[1].users[0].code, 'pileouface');
    assert.strictEqual(results[1].users[0].subordinates.length, 1);
    assert.strictEqual(results[1].users[0].subordinates[0].id, 3);
    assert.strictEqual(results[1].users[0].subordinates[0].code, 'maurel');
  });

  it('Nested many and Same subordinates and address', () => {
    const raws: any[] = [
      {
        id: 1,
        code: 'Luna',
        users__id: 1,
        users__code: 'wismerhill',
        users__subordinates__id: 3,
        users__subordinates__code: 'maurel',
        address__id: 1,
        address__code: 'Mulhouse',
      },
      {
        id: 1,
        code: 'Luna',
        users__id: 1,
        users__code: 'wismerhill',
        users__subordinates__id: 4,
        users__subordinates__code: 'apower',
        address__id: 1,
        address__code: 'Mulhouse',
      },
      {
        id: 2,
        code: 'Sun',
        users__id: 2,
        users__code: 'pileouface',
        users__subordinates__id: 3,
        users__subordinates__code: 'maurel',
        address__id: 1,
        address__code: 'Mulhouse',
      },
      {
        id: 1,
        code: 'Luna',
        users__id: 3,
        users__code: 'maurel',
        users__subordinates__id: null,
        users__subordinates__code: null,
        address__id: 1,
        address__code: 'Mulhouse',
      },
    ];
    const results = rowsInflator(raws, rowsMergerSchema);

    assert.strictEqual(results.length, 2);
    assert.strictEqual(results[0].id, 1);
    assert.strictEqual(results[0].code, 'Luna');
    assert.strictEqual(results[0].address.id, 1);
    assert.strictEqual(results[0].address.code, 'Mulhouse');
    assert.strictEqual(results[0].users.length, 2);
    assert.strictEqual(results[0].users[0].id, 1);
    assert.strictEqual(results[0].users[0].code, 'wismerhill');
    assert.strictEqual(results[0].users[0].subordinates.length, 2);
    assert.strictEqual(results[0].users[0].subordinates[0].id, 3);
    assert.strictEqual(results[0].users[0].subordinates[0].code, 'maurel');
    assert.strictEqual(results[0].users[0].subordinates[1].id, 4);
    assert.strictEqual(results[0].users[0].subordinates[1].code, 'apower');
    assert.strictEqual(results[0].users[0].code, 'wismerhill');
    assert.strictEqual(results[0].users[1].id, 3);
    assert.strictEqual(results[0].users[1].code, 'maurel');
    assert.strictEqual(results[1].id, 2);
    assert.strictEqual(results[1].code, 'Sun');
    assert.strictEqual(results[1].users.length, 1);
    assert.strictEqual(results[1].users[0].id, 2);
    assert.strictEqual(results[1].users[0].code, 'pileouface');
    assert.strictEqual(results[1].users[0].subordinates.length, 1);
    assert.strictEqual(results[1].users[0].subordinates[0].id, 3);
    assert.strictEqual(results[1].users[0].subordinates[0].code, 'maurel');
    assert.strictEqual(results[1].address.id, 1);
    assert.strictEqual(results[1].address.code, 'Mulhouse');
  });

  it('Nested many and hydration', () => {
    try {
      const raws: any[] = [
        {
          id: 1,
          code: 'Luna',
          users__id: 1,
          users__code: 'wismerhill',
          users__subordinates__id: 3,
          users__subordinates__code: 'maurel',
        },
        {
          id: 2,
          code: 'Sun',
          users__id: 2,
          users__code: 'pileouface',
          users__subordinates__id: null,
          users__subordinates__code: null,
        },
        {
          id: 1,
          code: 'Luna',
          users__id: 3,
          users__code: 'maurel',
          users__subordinates__id: null,
          users__subordinates__code: null,
        },
      ];
      rowsMergerSchema.hydrate = value => {
        value.specialField = `${value.id}_${value.code}`;
      };
      const results = rowsInflator(raws, rowsMergerSchema);

      assert.strictEqual(results.length, 2);
      assert.strictEqual(results[0].specialField, '1_Luna');
      assert.strictEqual(results[0].id, 1);
      assert.strictEqual(results[0].code, 'Luna');
      assert.strictEqual(results[0].users.length, 2);
      assert.strictEqual(results[0].users[0].id, 1);
      assert.strictEqual(results[0].users[0].code, 'wismerhill');
      assert.strictEqual(results[0].users[0].subordinates.length, 1);
      assert.strictEqual(results[0].users[0].subordinates[0].id, 3);
      assert.strictEqual(results[0].users[0].subordinates[0].code, 'maurel');
      assert.strictEqual(results[0].users[0].code, 'wismerhill');
      assert.strictEqual(results[0].users[1].id, 3);
      assert.strictEqual(results[0].users[1].code, 'maurel');
      assert.strictEqual(results[1].id, 2);
      assert.strictEqual(results[1].code, 'Sun');
      assert.strictEqual(results[1].users.length, 1);
      assert.strictEqual(results[1].users[0].id, 2);
      assert.strictEqual(results[1].users[0].code, 'pileouface');
    } finally {
      delete rowsMergerSchema.hydrate;
    }
  });

  it('No fields in root, thus no mapping', () => {
    const fields = rowsMergerSchema.fields;
    try {
      const raws: any[] = [
        {
          id: 1,
          code: 'Luna',
          users__id: 1,
          users__code: 'wismerhill',
          users__subordinates__id: 3,
          users__subordinates__code: 'maurel',
        },
        {
          id: 2,
          code: 'Sun',
          users__id: 2,
          users__code: 'pileouface',
          users__subordinates__id: null,
          users__subordinates__code: null,
        },
        {
          id: 1,
          code: 'Luna',
          users__id: 3,
          users__code: 'maurel',
          users__subordinates__id: null,
          users__subordinates__code: null,
        },
      ];
      rowsMergerSchema.fields = undefined as any;
      const results = rowsInflator(raws, rowsMergerSchema);

      assert.strictEqual(results.length, 0);
    } finally {
      rowsMergerSchema.fields = fields;
    }
  });

  it('No level schema', () => {
    const fields = rowsMergerSchema.fields;
    try {
      const raws: any[] = [
        {
          id: 1,
          code: 'Luna',
          users__id: 1,
          users__code: 'wismerhill',
          users__subordinates__id: 3,
          users__subordinates__code: 'maurel',
        },
        {
          id: 2,
          code: 'Sun',
          users__id: 2,
          users__code: 'pileouface',
          users__subordinates__id: null,
          users__subordinates__code: null,
        },
        {
          id: 1,
          code: 'Luna',
          users__id: 3,
          users__code: 'maurel',
          users__subordinates__id: null,
          users__subordinates__code: null,
        },
      ];
      const results = rowsInflator(raws, null as any);

      assert.strictEqual(results.length, 0);
    } finally {
      rowsMergerSchema.fields = fields;
    }
  });

  it('Complexe schema', () => {
    const schema: IRowsInflatorOptions = {
      fields: {
        id: true,
        code: true,
      },
      as: '',
      associationType: 0,
      associations: {
        user_skills: {
          as: 'user_skills',
          fields: {
            id: true,
            code: true,
          },
          associationType: 11,
          associations: {
            skill: {
              as: 'skill',
              fields: {
                id: true,
                code: true,
              },
              associationType: 1,
              associations: {},
              primaryKeys: ['id'],
            },
          },
          primaryKeys: ['id'],
        },
        subordinates: {
          as: 'subordinates',
          fields: {
            id: true,
            code: true,
          },
          associationType: 11,
          associations: {
            company: {
              as: 'company',
              fields: {
                id: true,
                code: true,
              },
              associationType: 1,
              associations: {},
              primaryKeys: ['id'],
            },
          },
          primaryKeys: ['id'],
        },
        company: {
          as: 'company',
          fields: {
            id: true,
            code: true,
          },
          associationType: 1,
          associations: {
            etablishments: {
              as: 'etablishments',
              fields: {
                id: true,
                code: true,
              },
              associationType: 11,
              associations: {
                etablishment: {
                  as: 'etablishment',
                  fields: {
                    id: true,
                    code: true,
                  },
                  associationType: 1,
                  associations: {},
                  primaryKeys: ['id'],
                },
              },
              primaryKeys: ['id'],
            },
          },
          primaryKeys: ['id'],
        },
      },
      primaryKeys: ['id'],
    };

    const results = rowsInflator(
      [
        {
          id: -1,
          code: 'aneta',
          user_skills__id: 1,
          user_skills__skill__id: 1,
          user_skills__skill__code: 'C++',
          subordinates__id: 2,
          subordinates__code: 'mbelaudi',
          subordinates__company__id: 4,
          subordinates__company__code: 'Something',
          company__id: -1,
          company__code: 'Something',
          company__etablishments__id: null,
          company__etablishments__etablishment__id: null,
        },
        {
          id: -1,
          code: 'aneta',
          user_skills__id: 2,
          user_skills__skill__id: 3,
          user_skills__skill__code: 'TypeScript',
          subordinates__id: 2,
          subordinates__code: 'mbelaudi',
          subordinates__company__id: 4,
          subordinates__company__code: 'Something',
          company__id: -1,
          company__code: 'Something',
          company__etablishments__id: null,
          company__etablishments__etablishment__id: null,
        },
        {
          id: -3,
          code: 'mbelaudi',
          user_skills__id: null,
          user_skills__skill__id: null,
          user_skills__skill__code: null,
          subordinates__id: null,
          subordinates__code: null,
          subordinates__company__id: null,
          subordinates__company__code: null,
          company__id: -1,
          company__code: 'Something',
          company__etablishments__id: null,
          company__etablishments__etablishment__id: null,
        },
        {
          id: -2,
          code: 'hbenao',
          user_skills__id: null,
          user_skills__skill__id: null,
          user_skills__skill__code: null,
          subordinates__id: null,
          subordinates__code: null,
          subordinates__company__id: null,
          subordinates__company__code: null,
          company__id: -2,
          company__code: 'Rave',
          company__etablishments__id: null,
          company__etablishments__etablishment__id: null,
        },
      ],
      schema
    );
    assert.strictEqual(results.length, 3);
    assert.deepEqual(results, [
      {
        id: -1,
        code: 'aneta',
        user_skills: [
          { id: 1, code: undefined, skill: { id: 1, code: 'C++' } },
          { id: 2, code: undefined, skill: { id: 3, code: 'TypeScript' } },
        ],
        subordinates: [{ id: 2, code: 'mbelaudi', company: { id: 4, code: 'Something' } }],
        company: { id: -1, code: 'Something' },
      },
      { id: -3, code: 'mbelaudi', company: { id: -1, code: 'Something' } },
      { id: -2, code: 'hbenao', company: { id: -2, code: 'Rave' } },
    ]);
  });
});
