/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from '@nestjs/common';
import { PrimaryGeneratedColumn } from 'typeorm';
import { IID } from './types';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @param id {@link id}
 */
export class IDEntity implements IID {
  @ApiProperty({ type: 'number' })
  @PrimaryGeneratedColumn()
  id!: number;
}

/**
 * Combine IDEntity with an extended entity
 * @param id {@link id}
 */
export function WithIDEntity<T extends Type<any>>(
  entity: T
): T & Type<IDEntity> {
  class ___IDEntity extends entity implements IID {
    @ApiProperty({ type: 'number' })
    @PrimaryGeneratedColumn()
    id!: number;
  }

  return ___IDEntity;
}
