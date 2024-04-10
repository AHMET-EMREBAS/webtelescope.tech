/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IDEntity } from './id';
import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { StringColumn } from './columns';

/**
 * @param id {@link IDEntity.id}
 * @param active {@link IActive.active}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export class TimestampEntity extends IDEntity {
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @DeleteDateColumn() deletedAt!: Date;
  @Column({ type: 'boolean', default: true }) active!: boolean;
  @StringColumn({ required: false }) description?: string;
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
  class __WithTimestamp extends entity {
    @ApiProperty({ type: 'number' }) @PrimaryGeneratedColumn() id!: number;
    @ApiProperty({ type: 'string' }) @CreateDateColumn() createdAt!: Date;
    @ApiProperty({ type: 'string' }) @UpdateDateColumn() updatedAt!: Date;
    @ApiProperty({ type: 'string' }) @DeleteDateColumn() deletedAt!: Date;
    @ApiProperty({ type: 'boolean' })
    @Column({ type: 'boolean', default: true })
    active!: boolean;
  }

  return __WithTimestamp;
}
