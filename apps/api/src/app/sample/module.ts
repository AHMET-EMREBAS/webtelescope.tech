import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './entity';
import { SampleController } from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  controllers: [SampleController],
})
export class SampleModule {}
