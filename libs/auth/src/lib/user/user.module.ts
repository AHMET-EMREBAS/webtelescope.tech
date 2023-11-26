import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Role, RoleController, RoleService } from '../role';
import {
  Permission,
  PermissionController,
  PermissionService,
} from '../permission';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission])],
  controllers: [UserController, RoleController, PermissionController],
  providers: [UserService, RoleService, PermissionService],
})
export class UserModule {}
