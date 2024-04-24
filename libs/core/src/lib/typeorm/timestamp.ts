import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { ITimestamp } from '@webpackages/common';
import { IDEntity, IDEntityView } from './id';
import { ViewColumn } from './column';

export abstract class TimestampEntity extends IDEntity implements ITimestamp {
  @CreateDateColumn() createdAt!: Date;
  @DeleteDateColumn() updatedAt!: Date;
  @UpdateDateColumn() deletedAt?: Date;
}

export abstract class TimestampEntityView
  extends IDEntityView
  implements ITimestamp
{
  @ViewColumn() createdAt!: Date;
  @ViewColumn() updatedAt!: Date;
  @ViewColumn() deletedAt!: Date;
}
