import { Global, Module } from '@nestjs/common';
import { CategoryController } from '@webpackages/rest-resource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@webpackages/entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './tmp/database.sqlite',
      entities: [Category],
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [CategoryController],
})
export class AppModule {}
