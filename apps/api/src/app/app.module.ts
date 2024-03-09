import { Module } from '@nestjs/common';
import { ProductModule } from './product.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './temp/database.sample.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    ProductModule,
  ],
})
export class AppModule {}
