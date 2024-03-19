import { Module } from '@nestjs/common';
import {
  EmailClustorModule,
  getAppNameToken,
  getCompanyNameToken,
  getDomainNameToken,
  provideAppName,
  provideCompanyName,
  provideDomainName,
} from '@webpackages/core';

// Get email and password
const [, pass] = process.env['INFO_EMAIL'].split('|||') ?? [];

@Module({
  imports: [
    EmailClustorModule.configure({
      host: 'smtp.titan.email',
      templates: [
        [
          'promotions@webtelescope.tech',
          pass,
          'Web Telescope Promotions',
          'promotions',
        ],
      ],
    }),
  ],
  providers: [
    provideAppName('WebTelescope'),
    provideDomainName('webtelescope.tech'),
    provideCompanyName('Web Telescope'),
  ],
  exports: [getAppNameToken(), getDomainNameToken(), getCompanyNameToken()],
})
export class CommonModule {}
