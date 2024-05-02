import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ICustomerProfile } from '@webpackages/common';
@Entity()
export class CustomerProfile extends BaseEntity implements ICustomerProfile {
  @Column({ type: 'string' }) firstName?: string;
  @Column({ type: 'string' }) lastName?: string;
}
