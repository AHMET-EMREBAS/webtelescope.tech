import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { TicketCategory } from '@webpackages/gen-entity';
import { TicketCategoryController } from './ticket-category.controller';
import { TicketCategoryService } from './ticket-category.service';
import { TicketCategoryView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketCategory, TicketCategoryView])],
  controllers: [TicketCategoryController],
  providers: [TicketCategoryService],
})
export class TicketCategoryModule {}
