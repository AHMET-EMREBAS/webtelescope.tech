import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Department } from '@webpackages/gen-entity';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { DepartmentView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, DepartmentView])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
