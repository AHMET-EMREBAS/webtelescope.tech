import { Injectable, UnauthorizedException } from '@nestjs/common';
import { v4 } from 'uuid';

export class SecurityCode {
  public readonly createdAt = new Date();
  constructor(public readonly code: string) {}
}

@Injectable()
export class SecurityCodeService {
  private readonly map = new Map<string, SecurityCode>();

  set(username: string) {
    const code = v4().substring(0, 6);
    this.map.set(username, new SecurityCode(code));

    return code;
  }

  verify(username: string, securityCode: string) {
    const code = this.map.get(username);

    if (code) {
      const codeTime = code?.createdAt.getTime();
      const current = new Date().getTime();

      const diff = current - codeTime;

      if (diff > 120000) {
        throw new UnauthorizedException('Code expired!');
      }
      if (code.code === securityCode) {
        return true;
      }
    }
    throw new UnauthorizedException(`You do not have security code!`);
  }
}
