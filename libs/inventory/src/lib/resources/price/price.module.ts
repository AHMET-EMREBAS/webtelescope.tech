import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './entities';
import { PriceController } from './price.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Price])],
  controllers: [PriceController],
})
export class PriceModule {}
