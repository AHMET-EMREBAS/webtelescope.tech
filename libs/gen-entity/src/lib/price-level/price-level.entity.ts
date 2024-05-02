import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IPriceLevel } from '@webpackages/common';
@Entity()
export class PriceLevel extends BaseEntity implements IPriceLevel {
  /**
   * Required unique short text
   */ @Column({
    type: 'string',
    required: true,
    unique: true,
    description: 'Required unique short text',
  })
  name!: string;
}
