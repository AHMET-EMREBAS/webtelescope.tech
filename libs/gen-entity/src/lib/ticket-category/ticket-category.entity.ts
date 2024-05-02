import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ITicketCategory } from '@webpackages/gen-model';
@Entity()
export class TicketCategory extends BaseEntity implements ITicketCategory {
  /**
   * Required unique short text
   */
  @Column({
    type: 'string',
    required: true,
    unique: true,
    description: 'Required unique short text',
  })
  name!: string;
}
