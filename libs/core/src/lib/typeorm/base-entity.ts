import { IID, ITimestamp } from '@webpackages/common';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ViewColumn,
} from 'typeorm';

export class BaseEntity implements ITimestamp, IID {
  @PrimaryGeneratedColumn() id!: number;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @DeleteDateColumn() deletedAt?: Date | undefined;
}
export class BaseView implements IID {
  @ViewColumn() id!: number;
}
