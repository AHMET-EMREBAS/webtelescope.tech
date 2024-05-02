import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Permission } from '@webpackages/gen-entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, PermissionView])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
