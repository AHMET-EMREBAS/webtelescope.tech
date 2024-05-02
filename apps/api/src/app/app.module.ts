import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@webpackages/config';
import { PermissionModule, RoleModule } from '@webpackages/gen-entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'workout',
      username: 'postgres',
      password: 'password',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    RoleModule,
    PermissionModule,
  ],
})
export class AppModule {}
