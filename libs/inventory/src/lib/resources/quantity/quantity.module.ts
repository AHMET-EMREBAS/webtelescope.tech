import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quantity } from './entities';
import { QuantityController } from './quantity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Quantity])],
  controllers: [QuantityController],
})
export class QuantityModule {}
