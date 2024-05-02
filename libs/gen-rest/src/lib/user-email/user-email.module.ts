import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { UserEmail } from '@webpackages/gen-entity';
import { UserEmailController } from './user-email.controller';
import { UserEmailService } from './user-email.service';
import { User, UserEmailView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEmail, User, UserEmailView])],
  controllers: [UserEmailController],
  providers: [UserEmailService],
})
export class UserEmailModule {}
