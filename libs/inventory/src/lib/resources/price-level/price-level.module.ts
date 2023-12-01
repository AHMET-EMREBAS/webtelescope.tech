import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceLevel } from './entities';
import { PriceLevelController } from './price-level.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PriceLevel])],
  controllers: [PriceLevelController],
})
export class PriceLevelModule {}
