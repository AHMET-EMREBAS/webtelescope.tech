/* eslint-disable @nx/enforce-module-boundaries */
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import { AUTH_TOKEN_NAME } from '@webtelescopetech/common';
import { AuthModule } from './auth.module';

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
        AuthModule.configure({ secret: 'secret' }),
      ],
    }).compile();

    app = await moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST auth/signup', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username: 'username@gmail.com', password: 'Password1!' })
      .expect(201)
      .expect((data) => {
        expect(data.body[AUTH_TOKEN_NAME]).toBeDefined();
      });
  });
});
