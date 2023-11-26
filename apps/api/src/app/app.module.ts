import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
 import { InventoryModule} from '@webpackages/resources'
@Module({
  imports: [
    EventEmitterModule.forRoot({ delimiter: '.' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'devdb',
      password: 'devdb',
      database: 'devdb',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
