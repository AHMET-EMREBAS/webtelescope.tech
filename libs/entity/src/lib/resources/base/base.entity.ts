import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Column } from '../column';
import { Entity } from '../entity';

/**
 * Common Entity Properties
 */
@Entity()
export class BaseEntity<T> {
  @PrimaryGeneratedColumn() id!: number;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @DeleteDateColumn() deletedAt!: Date;
  @Column({ type: 'boolean', default: true }) active!: boolean;
  @Column({ type: 'numeric', nullable: true }) createdBy!: boolean;
  @Column({ type: 'numeric', nullable: true }) updatedBy!: boolean;

  constructor(entity: T) {
    Object.assign(this, entity);
  }
}
