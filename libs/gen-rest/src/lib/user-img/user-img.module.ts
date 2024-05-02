import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { UserImg } from '@webpackages/gen-entity';
import { UserImgController } from './user-img.controller';
import { UserImgService, UserImgViewService } from './user-img.service';
import { User, UserImgView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserImg, User, UserImgView])],
  controllers: [UserImgController],
  providers: [UserImgService, UserImgViewService],
})
export class UserImgModule {}
