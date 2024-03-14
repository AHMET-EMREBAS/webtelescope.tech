import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample, SampleView } from './entity';
import { SampleController } from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sample, SampleView])],
  controllers: [SampleController],
})
export class SampleModule {}
