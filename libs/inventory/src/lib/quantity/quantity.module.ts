import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quantity } from './entities';
import { QuantityController } from './quantity.controller';
import { QuantityService } from './quantity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quantity])],
  controllers: [QuantityController],
  providers: [QuantityService],
})
export class QuantityModule {}
