import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ICategory } from '@webpackages/gen-model';
@Entity()
export class Category extends BaseEntity implements ICategory {
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
