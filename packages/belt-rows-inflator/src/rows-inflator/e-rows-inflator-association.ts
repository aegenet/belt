/** Type of association */
export enum ERowsInflatorAssociation {
  /** None - in the case of the root element */
  none = 0,

  /**
   * adds a foreign key to the target and singular association mixins to the source
   */
  hasOne = 1,

  /**
   * add a foreign key and singular association mixins to the source
   */
  belongsTo = 2,

  /**
   * adds a foreign key to target and plural association mixins to the source
   */
  hasMany = 11,

  /**
   * Creates an N:M association with a join table and adds plural association mixins to the source. The junction table is created with sourceId and targetId
   */
  belongsToMany = 12,
}
