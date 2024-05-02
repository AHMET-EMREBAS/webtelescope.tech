import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IDepartment } from '@webpackages/gen-model';
@Entity()
export class Department extends BaseEntity implements IDepartment {
  /**
   * Required unique short text
   */
  @Column({
    type: 'string',
    required: true,
    unique: true,
    description: 'Required unique short text',
  })
  name!: string;
}
