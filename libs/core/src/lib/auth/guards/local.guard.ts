import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthUserService,
  InjectAuthUserService,
  extractBody,
  Sub,
  setAccessToken,
} from '../common';

@Injectable()
export class LocalGuard implements CanActivate {
  constructor(
    @InjectAuthUserService()
    protected readonly userService: IAuthUserService,
    protected readonly jwt: JwtService
  ) {}
  async canActivate(context: ExecutionContext) {
    const { username: providedUsername, password: providedPassword } =
      extractBody(context);

    if (providedUsername && providedPassword) {
      const user = await this.userService.findByUsername(providedUsername);
      if (user) {
        const { id: sub, password: hashedPassword } = user;

        const result = await compare(providedPassword, hashedPassword);
        if (result) {
          const token = await this.jwt.signAsync({ sub } as Sub);
          setAccessToken(context, token);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
