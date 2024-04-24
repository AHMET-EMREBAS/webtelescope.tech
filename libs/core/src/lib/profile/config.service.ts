import { ConfigService } from '@nestjs/config';
import { InjectProfileService } from './_providers';
import { IProfileService } from './profile.service';
import { Some } from '@webpackages/common';
import { Profile } from './profiles';
import { Injectable } from '@nestjs/common';

/**
 * This interface is not only for storing configuration but also it might be used for localization of your messages.
 */
export interface IProfileConfigService {
  /**
   * This method allows us to prefix, suffix, or modify config key
   * @param key
   */
  __configKey(key: string): string;

  /**
   * This method allows us to prefix, suffix, or modify message key
   * @param key
   */
  __messageKey(key: string): string;
  /**
   * Get the config by key or undefined
   * @param key config key
   */
  get(key: string): Some<string>;

  /**
   * Get the config by key or undefined
   * @param key Configuration key
   */
  getOrThrow(key: string): string | never;

  /**
   * Set config by key and value
   * @param key
   * @param value
   */
  set(key: string, value: string): void;

  /**
   * Set multiple config items at a time.
   * @param record
   */
  setRecord(record: Record<string, string>): void;
  /**
   * Set message by key and value
   * Messages are the text values used across the application like "Hello World", "Item Not Found" etc.
   * This is for consistancy and localization of your service.
   * @param key
   * @param value
   */
  setMessage(key: string, value: string): void;

  setMessages(record: Record<string, string>): void;
  /**
   * Get message by message key
   * @param key Message key
   */
  getMessage(key: string): Some<string>;
  getMessageOrThrow(key: string): string | never;
}

@Injectable()
export class ProfileConfigService implements IProfileConfigService {
  constructor(
    @InjectProfileService() protected readonly profileService: IProfileService,
    protected readonly configService: ConfigService
  ) {}

  __configKey(key: string) {
    const prf = this.profileService.profile();
    return `${prf}_${key}`.toUpperCase();
  }

  __messageKey(key: string): string {
    const locale = this.getOrThrow(Profile.LOCALE);
    const prefix = `MSG_${locale}_`;
    return `${prefix}${key}`.toUpperCase();
  }

  get(key: string): Some<string> {
    return this.configService.get(this.__configKey(key));
  }

  getOrThrow(key: string): string {
    return this.configService.getOrThrow(this.__configKey(key));
  }

  set(key: string, value: string): void {
    this.configService.set(this.__configKey(key), value);
  }

  setRecord(record: Record<string, string>) {
    Object.entries(record).forEach(([key, value]) => {
      this.set(key, value);
    });
  }

  setMessage(key: string, value: string): void {
    this.configService.set(this.__messageKey(key), value);
  }

  setMessages(record: Record<string, string>): void {
    Object.entries(record).forEach(([key, value]) => {
      this.setMessage(key, value);
    });
  }
  getMessage(key: string): Some<string> {
    return this.configService.get(this.__messageKey(key));
  }
  getMessageOrThrow(key: string): string | never {
    return this.configService.getOrThrow(this.__messageKey(key));
  }
}
