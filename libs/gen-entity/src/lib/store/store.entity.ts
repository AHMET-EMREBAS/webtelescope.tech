import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IStore } from '@webpackages/gen-model';
@Entity()
export class Store extends BaseEntity implements IStore {
  /**
   * Required unique short text
   */ @Column({
    type: 'string',
    required: true,
    unique: true,
    description: 'Required unique short text',
  })
  name!: string;
}
