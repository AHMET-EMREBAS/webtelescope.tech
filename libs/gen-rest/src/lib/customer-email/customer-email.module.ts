import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { CustomerEmail } from '@webpackages/gen-entity';
import { CustomerEmailController } from './customer-email.controller';
import { CustomerEmailService } from './customer-email.service';
import { Customer, CustomerEmailView } from '@webpackages/gen-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEmail, Customer, CustomerEmailView]),
  ],
  controllers: [CustomerEmailController],
  providers: [CustomerEmailService],
})
export class CustomerEmailModule {}
