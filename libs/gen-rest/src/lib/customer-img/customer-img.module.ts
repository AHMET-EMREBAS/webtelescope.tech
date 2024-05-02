import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { CustomerImg } from '@webpackages/gen-entity';
import { CustomerImgController } from './customer-img.controller';
import {
  CustomerImgService,
  CustomerImgViewService,
} from './customer-img.service';
import { Customer, CustomerImgView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerImg, Customer, CustomerImgView])],
  controllers: [CustomerImgController],
  providers: [CustomerImgService, CustomerImgViewService],
})
export class CustomerImgModule {}
