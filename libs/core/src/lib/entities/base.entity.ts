/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Entity } from '../decorators';

@Entity()
export class BaseEntity<T = any> {
  @PrimaryGeneratedColumn() id!: number;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @DeleteDateColumn() deletedAt!: Date;

  constructor(obj: T) {
    Object.assign(this, obj);
  }
}
