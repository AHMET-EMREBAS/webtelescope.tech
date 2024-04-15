import { Module, OnModuleInit } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { v4 } from 'uuid';

@Entity()
class Sample {
  @PrimaryGeneratedColumn() id?: number;
  @Column() value: string;
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: join(__dirname, 'database', 'workout.sqlite'),
      entities: [Sample],
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([Sample]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectRepository(Sample) private readonly repo: Repository<Sample>
  ) {}

  async onModuleInit() {
    const value1 = v4();
    const value2 = v4();

    await this.repo.save({ value: value1 });
    await this.repo.save({ value: value2 });

    const found = await this.repo.findOneBy({ value: value2.substring(0, value2.length-1) });

    console.table(found);
  }
}
