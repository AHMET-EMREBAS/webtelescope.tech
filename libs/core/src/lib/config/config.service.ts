// import { ConfigService as NestConfigService } from '@nestjs/config';
// import { Some } from '@webpackages/common';
// import { Injectable } from '@nestjs/common';
// import { ConfigProfile } from './config-profile';

// /**
//  * This interface is not only for storing configuration but also it might be used for localization of your messages.
//  */
// export interface IConfigService {
//   /**
//    * This method allows us to prefix, suffix, or modify config key
//    * @param key
//    */
//   __configKey(key: string): string;

//   /**
//    * This method allows us to prefix, suffix, or modify message key
//    * @param key
//    */
//   __messageKey(key: string): string;

//   profile(): Some<string>;
//   profile(profileName: string): Some<string>;

//   /**
//    * Get the config by key or undefined
//    * @param key config key
//    */
//   get(key: string): Some<string>;

//   /**
//    * Get the config by key or undefined
//    * @param key Configuration key
//    */
//   getOrThrow(key: string): string | never;

//   /**
//    * Set config by key and value
//    * @param key
//    * @param value
//    */
//   set(key: string, value: string): void;

//   /**
//    * Set multiple config items at a time.
//    * @param record
//    */
//   record(record: Record<string, string>): void;

//   /**
//    * Set message by key and value
//    * Messages are the text values used across the application like "Hello World", "Item Not Found" etc.
//    * This is for consistancy and localization of your service.
//    * @param key
//    * @param value
//    */
//   setMessage(key: string, value: string): void;

//   setMessages(record: Record<string, string>): void;

//   /**
//    * Get message by message key
//    * @param key Message key
//    */
//   getMessage(key: string): Some<string>;

//   /**
//    * Get message by message key or throw
//    * @param key
//    */
//   getMessageOrThrow(key: string): string | never;
// }

// @Injectable()
// export class ConfigService implements IConfigService {
//   readonly $change = this.configService.changes$;

//   constructor(protected readonly configService: NestConfigService) {}

//   profile(profile?: string): string {
//     if (profile) {
//       this.configService.set(ConfigProfile.PROFILE, profile);
//     }
//     return this.configService.getOrThrow(ConfigProfile.PROFILE);
//   }

//   __configKey(key: string) {
//     const prf = this.profile();
//     return `${prf}_${key}`.toUpperCase();
//   }

//   __messageKey(key: string): string {
//     const locale = this.getOrThrow(ConfigProfile.LOCALE);
//     const profile = this.profile();
//     const prefix = `${profile}_MSG_${locale}_`;
//     return `${prefix}${key}`.toUpperCase();
//   }

//   get(key: string): Some<string> {
//     return this.configService.get(this.__configKey(key));
//   }

//   getOrThrow(key: string): string {
//     return this.configService.getOrThrow(this.__configKey(key));
//   }

//   set(key: string, value: string): void {
//     this.configService.set(this.__configKey(key), value);
//   }

//   record(record: Record<string, string>) {
//     Object.entries(record).forEach(([key, value]) => {
//       this.set(key, value);
//     });
//   }

//   getMessage(key: string): Some<string> {
//     return this.configService.get(this.__messageKey(key));
//   }
//   getMessageOrThrow(key: string): string | never {
//     return this.configService.getOrThrow(this.__messageKey(key));
//   }
//   setMessage(key: string, value: string): void {
//     this.configService.set(this.__messageKey(key), value);
//   }

//   setMessages(record: Record<string, string>): void {
//     Object.entries(record).forEach(([key, value]) => {
//       this.setMessage(key, value);
//     });
//   }
// }
