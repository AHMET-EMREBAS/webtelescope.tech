import { AppService } from './app.service';
import {
  Module,
  DatabaseModule,
  Repository,
  InjectRepository,
  TypeOrmModule,
  OnModuleInit,
} from '@webpackages/core';
import { ConfigModule } from '@webpackages/config';

import { Permission } from '@webpackages/auth';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule.root(),
    TypeOrmModule.forFeature([Permission]),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectRepository(Permission) private readonly repo: Repository<Permission>
  ) {}

  onModuleInit() {
    console.log('MODULE init ....................................');
    this.repo.find().then((data) => {
      console.log('Data -----------');

      console.table(data);
      console.log('-----------DATA');
    });
  }
}
