/* eslint-disable @typescript-eslint/no-explicit-any */
import { IActive, ITimestamp } from '@webpackages/model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IDEntity } from './id';
import { Type } from '@nestjs/common';

/**
 * @param id {@link IDEntity.id}
 * @param active {@link IActive.active}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export class TimestampEntity extends IDEntity implements ITimestamp, IActive {
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @DeleteDateColumn() deletedAt!: Date;
  @Column({ type: 'boolean', default: true }) active!: boolean;
}

/**
 * @param id {@link IDEntity.id}
 * @param active {@link IActive.active}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export function WithTimestampEntity<T extends Type<any>>(
  entity: T
): T & Type<TimestampEntity> {
  class __WithTimestamp extends entity implements ITimestamp, IActive {
    @PrimaryGeneratedColumn() id!: number;
    @CreateDateColumn() createdAt!: Date;
    @UpdateDateColumn() updatedAt!: Date;
    @DeleteDateColumn() deletedAt!: Date;
    @Column({ type: 'boolean', default: true }) active!: boolean;
  }

  return __WithTimestamp;
}
