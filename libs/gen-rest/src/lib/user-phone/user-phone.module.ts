import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { UserPhone } from '@webpackages/gen-entity';
import { UserPhoneController } from './user-phone.controller';
import { UserPhoneService } from './user-phone.service';
import { User, UserPhoneView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPhone, User, UserPhoneView])],
  controllers: [UserPhoneController],
  providers: [UserPhoneService],
})
export class UserPhoneModule {}
