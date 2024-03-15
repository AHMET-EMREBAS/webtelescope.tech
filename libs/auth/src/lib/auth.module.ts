import { Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  Role,
  Permission,
  Session,
  SessionRecord,
  SessionView,
  Subscription,
} from '@webpackages/entity';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';

const entities = [
  Subscription,
  User,
  Role,
  Permission,
  Session,
  SessionRecord,
  SessionView,
];

@Module({
  imports: [
    JwtModule.register({
      secret: process.env['SECRET'] || v4(),
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './tmp/auth.sqlite',
      entities: [...entities],
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([...entities]),
  ],
  controllers: [AuthController],
})
export class AuthModule implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  async onModuleInit() {
    await this.userRepo.save({
      username: 'user@email.com',
      password: '!Password1',
    });
  }
}
