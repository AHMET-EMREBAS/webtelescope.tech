import { Column, Entity, BaseEntity } from '@webpackages/core';
import { ICustomer } from '@webpackages/gen-model';
@Entity()
export class Customer extends BaseEntity implements ICustomer {
  @Column({ type: 'string', required: true, unique: true }) username!: string;
  @Column({ type: 'string', required: true }) password!: string;
}
