// import { Global, Module } from '@nestjs/common';
// import {
//   EmailModule,
//   getAppNameToken,
//   getCompanyNameToken,
//   getDomainNameToken,
//   provideAppName,
//   provideCompanyName,
//   provideDomainName,
// } from '@webpackages/core';
// import { EventEmitterModule } from '@nestjs/event-emitter';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
// import { AppEventService } from './app-events.service';
// // Get email and password
// const [, pass] = process.env['INFO_EMAIL'].split('|||') ?? [];

// @Global()
// @Module({
//   imports: [
//     EmailModule.configure({
//       auth: { user: 'security@webtelescope.tech', pass },
//       templateName: 'forgot-password',
//       emailHost: 'smtp.titan.email',
//       emailTitle: 'Reset Password',
//     }),
//     ServeStaticModule.forRoot({
//       rootPath: join(__dirname, 'public'),
//       serveRoot: '',
//     }),
//     EventEmitterModule.forRoot({ delimiter: '.', global: true }),
//   ],
//   providers: [
//     AppEventService,
//     provideAppName('WebTelescope'),
//     provideDomainName('webtelescope.tech'),
//     provideCompanyName('Web Telescope'),
//   ],
//   exports: [getAppNameToken(), getDomainNameToken(), getCompanyNameToken()],
// })
// export class CommonModule {}
