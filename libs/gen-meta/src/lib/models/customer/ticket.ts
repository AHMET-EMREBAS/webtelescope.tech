import {
  LongTextProperty,
  Model,
  OneRelation,
  ShortTextProperty,
} from '../../core';
import { UserModel } from '../user';
import { TicketCategoryModel } from './ticket-category';

export const TicketModel: Model = {
  modelName: 'Ticket',
  properties: {
    title: ShortTextProperty({ required: true }),
    description: LongTextProperty({ required: true }),
  },
  relations: {
    user: OneRelation(UserModel),
    ticketCategory: OneRelation(TicketCategoryModel),
  },
};
