import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Ticket } from '@webpackages/gen-entity';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { User, TicketCategory, TicketView } from '@webpackages/gen-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, User, TicketCategory, TicketView]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
