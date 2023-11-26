import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@webpackages/rest';

@Entity()
export class Notification extends BaseEntity {
  @Column({ type: 'varchar', unique: true }) name!: string;
}
