import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Store } from '@webpackages/gen-entity';
import { StoreController } from './store.controller';
import { StoreService, StoreViewService } from './store.service';
import { StoreView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, StoreView])],
  controllers: [StoreController],
  providers: [StoreService, StoreViewService],
})
export class StoreModule {}
