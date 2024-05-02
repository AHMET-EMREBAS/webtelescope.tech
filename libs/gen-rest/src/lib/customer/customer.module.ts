import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Customer } from '@webpackages/gen-entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerView])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
