import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Sprint } from '@webpackages/gen-entity';
import { SprintController } from './sprint.controller';
import { SprintService, SprintViewService } from './sprint.service';
import { SprintView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint, SprintView])],
  controllers: [SprintController],
  providers: [SprintService, SprintViewService],
})
export class SprintModule {}
