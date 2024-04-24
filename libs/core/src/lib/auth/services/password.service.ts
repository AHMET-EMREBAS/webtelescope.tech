import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

export interface IPasswordService<T = string> {
  hash(data: T): Promise<string>;
  compare(data: T, hashed: string): Promise<boolean>;
}

@Injectable()
export class PasswordService implements IPasswordService {
  async compare(data: string, hashed: string): Promise<boolean> {
    return await compare(data, hashed);
  }

  async hash(data: string): Promise<string> {
    return await hash(data, await genSalt(8));
  }
}

@Injectable()
export class TestPasswordService implements IPasswordService {
  async compare(data: string, hashed: string): Promise<boolean> {
    return compare(data, hashed);
  }
  async hash(value: string): Promise<string> {
    return await hash(value, await genSalt(8));
  }
}