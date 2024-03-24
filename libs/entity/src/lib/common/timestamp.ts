import { IActive, ITimestamp } from '@webpackages/model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IDEntity } from './id';

/**
 * @implements {@link ITimestamp}
 * @implements {@link IActive}
 */
export class TimestampEntity extends IDEntity implements ITimestamp, IActive {
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @DeleteDateColumn() deletedAt!: Date;
  @Column({ type: 'boolean', default: true }) active!: boolean;
}
