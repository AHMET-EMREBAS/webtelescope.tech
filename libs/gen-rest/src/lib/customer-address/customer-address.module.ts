import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { CustomerAddress } from '@webpackages/gen-entity';
import { CustomerAddressController } from './customer-address.controller';
import {
  CustomerAddressService,
  CustomerAddressViewService,
} from './customer-address.service';
import { Customer, CustomerAddressView } from '@webpackages/gen-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerAddress, Customer, CustomerAddressView]),
  ],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService, CustomerAddressViewService],
})
export class CustomerAddressModule {}
