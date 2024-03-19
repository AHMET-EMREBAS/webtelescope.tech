import { Global, Module, OnModuleInit } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleModule } from './sample';
import { TodoModule } from './todo';
import {
  AuthModule,
  EmailModule,
  EmailService,
  InjectEmailService,
  getAppNameToken,
  getCompanyNameToken,
  getDomainNameToken,
  provideAppName,
  provideCompanyName,
  provideDomainName,
} from '@webpackages/core';
import { Todo } from './todo/entity';
import { Sample } from './sample/entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const [user, pass] = process.env['INFO_EMAIL'].split('|||') ?? [];

@Global()
@Module({
  providers: [
    AppService,
    provideAppName('WebTelescope'),
    provideDomainName('webtelescope.tech'),
    provideCompanyName('Web Telescope'),
  ],
  exports: [getAppNameToken(), getDomainNameToken(), getCompanyNameToken()],
})
export class CommonModule {}

@Global()
@Module({
  imports: [
    CommonModule,
    EmailModule.configure({
      auth: {
        user,
        pass,
      },
      templateName: 'verify',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      serveRoot: '',
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './tmp/app.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    AuthModule.configure({
      resourceEntities: [Todo, Sample],
      roleNames: ['admin'],
      root: {
        username: 'root@webtelescope.tech',
        password: '!Password1',
      },
    }),
    TodoModule,
    SampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectEmailService('verify') private readonly email: EmailService
  ) {}

  async onModuleInit() {
    const result = await this.email.send({
      message: 'Hello there',
      subject: 'Verify Email',
      to: 'aemrebas.dev@gmail.com',
      token: 'token goes here.',
      securityCode: 'code goes here',
    });

    console.log(result);
  }
}
