import { compare, genSalt, hash } from 'bcrypt';

export interface IPasswordService<T = string> {
  hash(data: T): Promise<string>;
  compare(data: T, hashed: string): Promise<boolean>;
}

export class DefaultPasswordService implements IPasswordService {
  async compare(data: string, hashed: string): Promise<boolean> {
    return await compare(data, hashed);
  }

  async hash(data: string): Promise<string> {
    return hash(data, await genSalt(8));
  }
}

export class TestPasswordService implements IPasswordService {
  async compare(data: string, hashed: string): Promise<boolean> {
    return data === hashed;
  }
  async hash(value: string): Promise<string> {
    return value;
  }
}
