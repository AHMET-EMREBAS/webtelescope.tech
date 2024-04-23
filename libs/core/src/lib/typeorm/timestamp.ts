import { ITimestamp } from '@webpackages/common';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

import { IDEntity } from './id';

export abstract class TimestampEntity extends IDEntity implements ITimestamp {
  @CreateDateColumn() createdAt!: Date;
  @DeleteDateColumn() updatedAt!: Date;
  @UpdateDateColumn() deletedAt?: Date;
}
