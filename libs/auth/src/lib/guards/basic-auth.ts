/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { Request } from 'express';
import { LoginDto } from '../dto';
import { Repository } from 'typeorm';
import { Session, User } from '@webpackages/entity';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AUTH_NAME as AUTH_NAME } from '@webpackages/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Public } from '../decorators';
import { getTokenFromAutorizationHeader } from '../utils';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Session) private readonly sessionRepo: Repository<Session>
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest() as Request;

    const token = getTokenFromAutorizationHeader(req);

    if (token) {
      let payload!: { sub: number } | null;
      let session!: Session | null;
      try {
        payload = this.jwt.verify<{ sub: number }>(token);
        if (payload) {
          session =
            (await this.sessionRepo.findOneBy({ id: payload.sub })) ?? null;
        }
      } catch (err) {
        // There is not session.
      }

      if (session) {
        throw new BadRequestException('You already have an active session!');
      }
    }

    const { username, password } = req.body as LoginDto;

    const found = await this.userRepo.findOneBy({ username });

    if (!found) throw new UnauthorizedException('User not found!');

    const isPasswordMatch = await compare(password, found?.password);

    if (isPasswordMatch) {
      const session = await this.sessionRepo.save({
        uid: found.id,
        user: found,
      });
      const token = await this.jwt.signAsync({ sub: session.id });
      (req as any)[AUTH_NAME] = token;
      return true;
    }

    return true;
  }
}

export function BasicAuth() {
  return applyDecorators(Public(), UseGuards(BasicAuthGuard));
}
