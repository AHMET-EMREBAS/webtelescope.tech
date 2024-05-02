import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ISprint } from '@webpackages/gen-model';
@Entity()
export class Sprint extends BaseEntity implements ISprint {
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
