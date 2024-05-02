import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Project } from '@webpackages/gen-entity';
import { ProjectController } from './project.controller';
import { ProjectService, ProjectViewService } from './project.service';
import { ProjectView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectView])],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectViewService],
})
export class ProjectModule {}
