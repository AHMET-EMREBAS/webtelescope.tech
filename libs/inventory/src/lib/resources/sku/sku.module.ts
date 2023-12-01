import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sku } from './entities';
import { SkuController } from './sku.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sku])],
  controllers: [SkuController],
})
export class SkuModule {}
