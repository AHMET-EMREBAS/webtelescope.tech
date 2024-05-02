import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { CustomerProfile } from '@webpackages/gen-entity';
import { CustomerProfileController } from './customer-profile.controller';
import {
  CustomerProfileService,
  CustomerProfileViewService,
} from './customer-profile.service';
import { Customer, CustomerProfileView } from '@webpackages/gen-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerProfile, Customer, CustomerProfileView]),
  ],
  controllers: [CustomerProfileController],
  providers: [CustomerProfileService, CustomerProfileViewService],
})
export class CustomerProfileModule {}
