import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { PriceLevel } from '@webpackages/gen-entity';
import { PriceLevelController } from './price-level.controller';
import {
  PriceLevelService,
  PriceLevelViewService,
} from './price-level.service';
import { PriceLevelView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([PriceLevel, PriceLevelView])],
  controllers: [PriceLevelController],
  providers: [PriceLevelService, PriceLevelViewService],
})
export class PriceLevelModule {}
