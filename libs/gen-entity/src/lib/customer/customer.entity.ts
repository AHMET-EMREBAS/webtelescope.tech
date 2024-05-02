import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ICustomer } from '@webpackages/common';
@Entity()
export class Customer extends BaseEntity implements ICustomer {
  @Column({ type: 'string', required: true, unique: true }) username!: string;
  @Column({ type: 'string', required: true }) password!: string;
}
