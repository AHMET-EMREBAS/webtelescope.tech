import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sku } from './entities';
import { SkuController } from './sku.controller';
import { SkuService } from './sku.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sku])],
  controllers: [SkuController],
  providers: [SkuService],
})
export class SkuModule {}
