import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Price } from '@webpackages/gen-entity';
import { PriceController } from './price.controller';
import { PriceService, PriceViewService } from './price.service';
import { PriceLevel, Product, PriceView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Price, PriceLevel, Product, PriceView])],
  controllers: [PriceController],
  providers: [PriceService, PriceViewService],
})
export class PriceModule {}
