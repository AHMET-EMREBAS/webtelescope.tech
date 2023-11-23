import { Injectable, UnauthorizedException } from '@nestjs/common';
import { v4 } from 'uuid';

export class SecurityCode {
  public readonly createdAt = Date.now();
  public readonly code = v4().substring(0, 6);
  constructor() {}
}

@Injectable()
export class SecurityCodeService {
  private readonly codes = new Map<string, SecurityCode>();

  private getCode(username: string): SecurityCode {
    const found = this.codes.get(username);
    if (found) {
      return found;
    }

    throw new UnauthorizedException('Security code is not found!');
  }

  setCode(username: string): string {
    const securityCode = new SecurityCode();
    this.codes.set(username, new SecurityCode());
    return securityCode.code;
  }

  /**
   * If code is valid, then return true, else throw UnauthorizedException
   * @param username
   * @param securityCode
   * @returns
   */
  verifyCodeOrThrow(username: string, securityCode: string): true {
    const { code, createdAt } = this.getCode(username);
    const currentTime = Date.now();

    if (code === securityCode) {
      // Check 2 minutes passed
      if (currentTime - createdAt < 120000) return true;
    }
    throw new UnauthorizedException('Security code is expired!');
  }
}
