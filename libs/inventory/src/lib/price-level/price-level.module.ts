import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceLevel } from './entities';
import { PriceLevelController } from './price-level.controller';
import { PriceLevelService } from './price-level.service';

@Module({
  imports: [TypeOrmModule.forFeature([PriceLevel])],
  controllers: [PriceLevelController],
  providers: [PriceLevelService],
})
export class PriceLevelModule {}
