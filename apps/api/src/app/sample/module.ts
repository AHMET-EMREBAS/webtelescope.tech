import { Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './entity';
import { SampleController } from './controller';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  controllers: [SampleController],
})
export class SampleModule implements OnModuleInit {
  constructor(
    @InjectRepository(Sample) private readonly repo: Repository<Sample>
  ) {}
  async onModuleInit() {
    await this.repo.save({ name: 'some' });
  }
}
