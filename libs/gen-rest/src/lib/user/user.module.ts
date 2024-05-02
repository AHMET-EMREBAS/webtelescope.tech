import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { User } from '@webpackages/gen-entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Role, Department, UserView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Department, UserView])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
