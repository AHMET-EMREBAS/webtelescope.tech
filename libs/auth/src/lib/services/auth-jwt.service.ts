import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Session } from '@webpackages/entity';
import { SessionPayload } from '@webpackages/model';

@Injectable()
export class AuthJwtService {
  private readonly logger!: Logger;
  constructor(protected readonly jwt: JwtService) {
    this.logger = new Logger(AuthJwtService.name);
  }

  signToken(session: Session) {
    this.logger.debug('Trying to sing JWT Token');
    const result = this.jwt.sign({ sub: session.id });
    this.logger.debug(`Signed Token : ${result}`);
    return result;
  }

  verifyToken(token: string): SessionPayload {
    try {
      this.logger.debug('Trying to verify JWT Token');
      const result = this.jwt.verify<SessionPayload>(token);
      this.logger.debug(`Verified token : ${result}`);
      return result;
    } catch (err) {
      this.logger.debug('Could not verify JWT Token');
      throw new UnauthorizedException('Invalid token');
    }
  }
}
