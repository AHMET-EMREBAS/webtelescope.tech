import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Task } from '@webpackages/gen-entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { User, Sprint, TaskView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, Sprint, TaskView])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
