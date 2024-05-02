import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IPermission } from '@webpackages/gen-model';
@Entity()
export class Permission extends BaseEntity implements IPermission {
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
