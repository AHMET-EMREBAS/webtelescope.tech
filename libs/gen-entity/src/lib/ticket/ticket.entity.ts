import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ITicket } from '@webpackages/gen-model';
import { User } from '../user/user.entity';
import { TicketCategory } from '../ticket-category/ticket-category.entity';
@Entity()
export class Ticket
  extends BaseEntity
  implements ITicket<User, TicketCategory>
{
  @Column({ type: 'string', required: true }) title!: string;
  @Column({ type: 'string', required: true }) description!: string;
  @Relation({ relationType: 'One', objectType: User }) assignee?: User;
  @Relation({ relationType: 'One', objectType: TicketCategory })
  category?: TicketCategory;
}
