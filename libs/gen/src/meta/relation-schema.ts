export type RelationType =
  | 'OneToOne'
  | 'OneToMany'
  | 'ManyToOne'
  | 'ManyToMany';

export type __OnAction =
  | 'RESTRICT'
  | 'CASCADE'
  | 'SET NULL'
  | 'DEFAULT'
  | 'NO ACTION';

export type OnDelete = __OnAction;
export type OnUpdate = __OnAction;

export type CascadeOn =
  | 'insert'
  | 'update'
  | 'remove'
  | 'soft-remove'
  | 'recover';

export interface BaseRelation<
  ClassName extends string,
  PropertyName extends string
> {
  type: RelationType;
  target: ClassName;
  foreignKey?: PropertyName;
  nullable?: true;
  lazy?: true;
  eager?: true;
  join?: true;
  onDelete?: OnDelete;
  onUpdate?: OnUpdate;
  cascade?: CascadeOn;
  createForeignKeyConstraints?: false;
}

export interface RelationSchema<
  ClassName extends string,
  PropertyName extends string
> extends BaseRelation<ClassName, PropertyName> {}
