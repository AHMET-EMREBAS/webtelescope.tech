import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { UserAddress } from '@webpackages/gen-entity';
import { UserAddressController } from './user-address.controller';
import { UserAddressService } from './user-address.service';
import { User, UserAddressView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress, User, UserAddressView])],
  controllers: [UserAddressController],
  providers: [UserAddressService],
})
export class UserAddressModule {}
