import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Role } from '@webpackages/gen-entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Permission, RoleView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, RoleView])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
