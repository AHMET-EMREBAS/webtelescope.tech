import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Column } from './decorators';

export class BaseEntity {
  @PrimaryGeneratedColumn() id!: number;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @DeleteDateColumn() deletedAt!: Date;
  @Column({ type: 'boolean', nullable: true }) active!: boolean;
  @Column({ type: 'numeric', nullable: true }) createdBy!: number;
  @Column({ type: 'numeric', nullable: true }) updatedBy!: number;
}
