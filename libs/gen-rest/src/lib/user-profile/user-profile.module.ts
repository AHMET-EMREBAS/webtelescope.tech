import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { UserProfile } from '@webpackages/gen-entity';
import { UserProfileController } from './user-profile.controller';
import {
  UserProfileService,
  UserProfileViewService,
} from './user-profile.service';
import { User, UserProfileView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile, User, UserProfileView])],
  controllers: [UserProfileController],
  providers: [UserProfileService, UserProfileViewService],
})
export class UserProfileModule {}
