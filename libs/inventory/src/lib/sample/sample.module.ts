import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './entities';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  controllers: [SampleController],
  providers: [SampleService],
})
export class SampleModule {}
