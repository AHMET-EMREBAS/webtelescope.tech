import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { extractBody, setAccessToken } from '../common';
import {
  IAuthUserService,
  IPasswordService,
  ITokenService,
  InjectAuthUserService,
  InjectPasswordService,
  InjectTokenService,
} from '../services';

@Injectable()
export class LocalGuard implements CanActivate {
  constructor(
    @InjectAuthUserService()
    protected readonly userService: IAuthUserService,
    @InjectPasswordService()
    protected readonly passwordService: IPasswordService,
    @InjectTokenService() protected readonly tokenService: ITokenService
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
          const token = await this.tokenService.sign({ sub });
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
