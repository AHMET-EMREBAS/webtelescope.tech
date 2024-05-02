import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { CustomerPhone } from '@webpackages/gen-entity';
import { CustomerPhoneController } from './customer-phone.controller';
import {
  CustomerPhoneService,
  CustomerPhoneViewService,
} from './customer-phone.service';
import { Customer, CustomerPhoneView } from '@webpackages/gen-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerPhone, Customer, CustomerPhoneView]),
  ],
  controllers: [CustomerPhoneController],
  providers: [CustomerPhoneService, CustomerPhoneViewService],
})
export class CustomerPhoneModule {}
