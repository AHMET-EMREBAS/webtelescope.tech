/* eslint-disable @nx/enforce-module-boundaries */
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Role, Permission } from '../entities';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { INestApplication } from '@nestjs/common';
import { AUTH_TOKEN_NAME } from '@webtelescopetech/common';
describe('AuthController', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: './tmp/testing/auth-module.sqlite',
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([User, Role, Permission]),
        EventEmitterModule,
        JwtModule.register({
          secret: 'secret',
          signOptions: {
            expiresIn: '30d',
          },
        }),
      ],
    }).compile();

    app = await moduleRef.createNestApplication().init();
  });

  it('/POST auth/signup', async () => {
    return await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username: 'username@gmail.com', password: 'Password1!' })
      .expect(201)
      .expect((data) => {
        expect(data.body[AUTH_TOKEN_NAME]).toBeDefined();
      });
  });
});
