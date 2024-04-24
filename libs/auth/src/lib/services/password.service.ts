import {
  IPasswordService,
  Injectable,
  compare,
  hash,
  genSalt,
} from '@webpackages/core';

@Injectable()
export class PasswordService implements IPasswordService {
  async compare(data: string, hashed: string): Promise<boolean> {
    return await compare(data, hashed);
  }

  async hash(data: string): Promise<string> {
    return await hash(data, await genSalt(8));
  }
}
