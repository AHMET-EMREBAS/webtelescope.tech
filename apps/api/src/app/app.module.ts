import { Global, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleModule } from './sample';
import { TodoModule } from './todo';
import {
  AuthModule,
  EmailClustorModule,
  EmailService,
  InjectEmailService,
  getAppNameToken,
  getCompanyNameToken,
  getDomainNameToken,
  provideAppName,
  provideCompanyName,
  provideDomainName,
} from '@webpackages/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const [, pass] = process.env['INFO_EMAIL'].split('|||') ?? [];

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
    EmailClustorModule.configure({
      host: 'smtp.titan.email',
      templates: [
        [
          'promotions@webtelescope.tech',
          pass,
          'Web Telescope Promotions',
          'promotions',
        ],
        // [
        //   'security@webtelescope.tech',
        //   pass,
        //   'Verify Your Email Addresss',
        //   'verify',
        // ],
        // [
        //   'security@webtelescope.tech',
        //   pass,
        //   'Reset Password',
        //   'reset-password',
        // ],
        // ['career@webtelescope.tech', pass, 'Careers', 'career'],
      ],
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
    AuthModule,
    TodoModule,
    SampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    @InjectEmailService('promotions') private readonly promotions: EmailService
  ) {
    this.promotions
      .send({
        subject: 'New Products',
        to: 'aemrebas.dev@gmail.com',
        text: 'We try to send our product list',
        data: {
          title: 'Promotions',
          message: 'Here are some products you might interested in.',
          domain: 'webtelescope.tech',
          company: 'Web Telescope Inc',
          items: [
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
            {
              title: 'Product title 1',
              subTitle: 'Sub title',
              content: 'Content ',
              href: 'href',
              imgSrc:
                'https://ahmet-emrebas.github.io/assets/icons/icon-512x512.png',
            },
          ],
        },
      })
      .then();
  }
}
