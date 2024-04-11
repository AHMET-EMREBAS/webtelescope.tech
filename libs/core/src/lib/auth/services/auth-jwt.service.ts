import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Session } from '@webpackages/entity';
import { SessionPayload } from '@webpackages/model';

@Injectable()
export class AuthJwtService {
  constructor(protected readonly jwt: JwtService) {}

  signToken(session: Session) {
    return this.jwt.sign({ sub: session.id });
  }

  verifyToken(token: string): SessionPayload {
    try {
      return this.jwt.verify<SessionPayload>(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
