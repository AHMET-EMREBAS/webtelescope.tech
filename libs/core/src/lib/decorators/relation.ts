import { JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { CombinePropertyDecorators } from './combine';
import { BaseEntity } from '../entities';
import { Type } from '@nestjs/common';

/**
 * For relation like user profile
 * @param ownerEntity
 * @returns
 */
export function OwnerRelation<T extends BaseEntity>(ownerEntity: Type<T>) {
  return CombinePropertyDecorators(
    ManyToOne(
      () => ownerEntity,
      (e) => e.id,
      { onDelete: 'CASCADE' }
    ),
    JoinColumn()
  );
}

/**
 * For relation like product department
 * @param subEntity
 * @returns
 */
export function SubRelation<T extends BaseEntity>(subEntity: Type<T>) {
  return CombinePropertyDecorators(
    ManyToOne(
      () => subEntity,
      (e) => e.id,
      { eager: true }
    ),
    JoinColumn()
  );
}

/**
 * For entities like product categories
 * @param subEntity
 * @returns
 */
export function SubsRelation<T extends BaseEntity>(subEntity: Type<T>) {
  return CombinePropertyDecorators(
    ManyToMany(
      () => subEntity,
      (e) => e.id,
      { eager: true }
    ),
    JoinTable()
  );
}
