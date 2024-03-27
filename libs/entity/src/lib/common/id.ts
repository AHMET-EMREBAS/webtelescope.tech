/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from '@nestjs/common';
import { IID } from '@webpackages/model';
import { PrimaryGeneratedColumn } from 'typeorm';

/**
 * @param id {@link id}
 */
export class IDEntity implements IID {
  @PrimaryGeneratedColumn() id!: number;
}

/**
 * Combine IDEntity with an extended entity
 * @param id {@link id}
 */
export function WithIDEntity<T extends Type<any>>(
  entity: T
): T & Type<IDEntity> {
  class ___IDEntity extends entity implements IID {
    @PrimaryGeneratedColumn() id!: number;
  }

  return ___IDEntity;
}
