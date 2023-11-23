/* eslint-disable @nx/enforce-module-boundaries */
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AUTH_TOKEN_NAME } from '@webtelescopetech/common';

import request = require('supertest');
import { ForgotPasswordDto, LoginWithCodeDto } from './dto';

describe('AuthModule', () => {
  let app: INestApplication;
  let existingUser = { username: 'valid@valid.com', password: 'ValidPass1!' };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        EventEmitterModule.forRoot({ delimiter: '.' }),
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: './tmp/testing/auth-module.sqlite',
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: true,
        }),
        AuthModule.configure({ secret: 'secret' }),
      ],
    }).compile();

    app = await moduleRef.createNestApplication().init();

    await request(app.getHttpServer()).post('/auth/signup').send(existingUser);
  });

  it('/POST auth/signup', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username: 'username@gmail.com', password: 'Password1!' })
      .expect(201)
      .expect((data: any) => {
        expect(data.body[AUTH_TOKEN_NAME]).toBeDefined();
      });
  });

  it('/POST auth/login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(existingUser)
      .expect(201)
      .expect((data) => {
        expect(data.body[AUTH_TOKEN_NAME]).toBeDefined();
      });
  });

  it('/POST auth/forgot-password', () => {
    return request(app.getHttpServer())
      .post('/auth/forgot-password')
      .send(
        new ForgotPasswordDto({
          username: existingUser.username,
        })
      )
      .expect(201)
      .expect((data) => {
        expect(data.body.message).toBeDefined();
      });
  });

  it('/POST auth/login-with-code', () => {
    return request(app.getHttpServer())
      .post('/auth/login-with-code')
      .send(
        new LoginWithCodeDto({
          username: existingUser.username,
          code: '123456',
        })
      )
      .expect(HttpStatus.UNAUTHORIZED)
      .expect((data) => {
        expect(data.body.message).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
