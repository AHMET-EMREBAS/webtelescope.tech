import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AuthNames, extractBody } from '../common';
import {
  IUserService,
  IPasswordService,
  ITokenService,
  InjectUserService,
  InjectPasswordService,
  InjectTokenService,
  InjectRootUserService,
} from '../services';

@Injectable()
export class LocalGuard implements CanActivate {
  logger = new Logger();

  log(msg: string) {
    this.logger.debug(msg);
  }
  constructor(
    @InjectUserService()
    protected readonly userService: IUserService,

    @InjectRootUserService()
    protected readonly rootUserService: IUserService,

    @InjectPasswordService()
    protected readonly passwordService: IPasswordService,

    @InjectTokenService() protected readonly tokenService: ITokenService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { username: providedUsername, password: providedPassword } =
      extractBody(req);

    this.log(
      `Provided username '${providedUsername}' and password '${providedPassword}'`
    );

    if (providedUsername && providedPassword) {
      (this.rootUserService as any).users.forEach((user: any) =>
        console.table({ user })
      );

      const user =
        (await this.userService.findByUsername(providedUsername)) ??
        (await this.rootUserService.findByUsername(providedUsername));

      this.log(`found user ${user?.username} | ${user?.password}`);
      if (user) {
        const { id: sub, password: hashedPassword } = user;

        const result = await this.passwordService.compare(
          providedPassword,
          hashedPassword
        );
        if (result) {
          // Sign token
          const token = await this.tokenService.sign({ sub });
          // Append token to the request
          req[AuthNames.BEARER_HEADER_KEY] = token;

          return true;
        } else {
          this.log(
            `Password does not match ${user.password} | ${hashedPassword}`
          );
          return false;
        }
      } else {
        this.log('Could not find the user by credential!');
        return false;
      }
    } else {
      this.log('Username or password is not provided!');
      return false;
    }
  }
}
