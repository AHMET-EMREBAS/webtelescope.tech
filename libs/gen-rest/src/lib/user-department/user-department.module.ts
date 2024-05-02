import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { UserDepartment } from '@webpackages/gen-entity';
import { UserDepartmentController } from './user-department.controller';
import { UserDepartmentService } from './user-department.service';
import { UserDepartmentView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDepartment, UserDepartmentView])],
  controllers: [UserDepartmentController],
  providers: [UserDepartmentService],
})
export class UserDepartmentModule {}
