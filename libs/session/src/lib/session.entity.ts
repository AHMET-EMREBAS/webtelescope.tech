/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entity, Column, BaseEntity } from '@webpackages/entity';

@Entity()
export class Session extends BaseEntity {
  @Column({ type: 'object' }) data: any;
}
