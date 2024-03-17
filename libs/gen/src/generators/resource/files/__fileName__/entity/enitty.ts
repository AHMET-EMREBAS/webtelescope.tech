import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@webpackages/core';

@Entity()
export class <%- className %> extends BaseEntity {
  @Column({ type: 'varchar' }) name!: string;
}
