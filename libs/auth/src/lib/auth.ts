import { ConfigModule } from '@nestjs/config';
import { Module, TypeOrmModule } from '@webpackages/core';
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([])],
})
export class AuthModule {}
