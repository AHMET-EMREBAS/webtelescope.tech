import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import { compare, compareSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './resources';
import {
  LoginDto,
  SignupDto,
  AuthPayload,
  SUBSCRIBER_ROLE,
  UpdatePasswordDto,
  ForgotPasswordDto,
  AuthEvents,
  UpdatePasswordByCodeDto,
} from './auth';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 } from 'uuid';

export class SecurityCode {
  readonly time = new Date();
  readonly code = v4().substring(0, 6);
  constructor(public readonly username: string) {}
}

@Injectable()
export class AuthService {
  private readonly codeStore = new Map<string, SecurityCode>();

  constructor(
    protected readonly jwtService: JwtService,
    @InjectRepository(User) protected readonly userRepo: Repository<User>,
    @InjectRepository(Role) protected readonly roleRepo: Repository<Role>,
    protected readonly eventEmitter: EventEmitter2
  ) {}

  protected async findById(id: number) {
    const found = await this.userRepo.findOneBy({ id });
    if (found) {
      return found;
    }
    throw new NotFoundException('User not found!');
  }

  protected async findByUsernameOrThrow(username: string): Promise<User> {
    const foundUser = await this.userRepo.findOneBy({ username });
    if (foundUser) {
      return foundUser;
    }
    throw new NotFoundException('User not found!');
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { username, password } = loginDto;

    const foundUser = await this.findByUsernameOrThrow(username);
    const { password: hashedPassword } = foundUser;
    const isPasswordMatch = await compare(password, hashedPassword);

    if (isPasswordMatch) {
      return this.signToken(foundUser);
    }
    throw new UnauthorizedException('Password is wrong!');
  }

  async signup(signupDto: SignupDto): Promise<string> {
    const { username } = signupDto;
    const foundUser = await this.userRepo.findOneBy({ username });

    if (foundUser) {
      throw new UnprocessableEntityException('User already exist!');
    }

    const savedUser = await this.createSubscriber(signupDto);
    return this.signToken(savedUser);
  }

  protected signToken(user: User) {
    return this.jwtService.sign({ sub: user.id });
  }

  async verifyToken(token: string): Promise<User | null> {
    try {
      const authPayload: AuthPayload = this.jwtService.verify(token);
      return await this.findById(authPayload.sub);
    } catch (err) {
      throw new UnauthorizedException('Session Expired!');
    }
  }

  protected async createSubscriber(signupDto: SignupDto): Promise<User> {
    const subscriberRole = await this.roleRepo.findOneBy({
      name: SUBSCRIBER_ROLE,
    });

    if (subscriberRole) {
      const savedUser = await this.userRepo.save({
        ...signupDto,
        roles: [{ id: subscriberRole?.id }],
      });
      return savedUser;
    }

    throw new InternalServerErrorException('Could not signup!');
  }

  async updatePassword(body: UpdatePasswordDto) {
    const { username, password, newPassword } = body;
    const foundUser = await this.findByUsernameOrThrow(username);
    if (foundUser) {
      const { id, password: hashedPassword } = foundUser;
      if (compareSync(password, hashedPassword)) {
        return await this.userRepo.update(id, { password: newPassword });
      }
      throw new UnauthorizedException('Wrong password!');
    }
    throw new NotFoundException('User not found!');
  }

  /**
   * Send 2 minute security code to user to reset password.
   * @param body
   */
  async forgotPassword(body: ForgotPasswordDto) {
    const { username } = await this.findByUsernameOrThrow(body.username);

    const code = this.createSecurityCode(username);
    this.eventEmitter.emit(AuthEvents.FORGOT_PASSWORD, { username, code });

    return { message: 'We sent one time security code' };
  }

  /**
   * Reset password with security code
   * @param body
   */
  async updatePasswordByCode(body: UpdatePasswordByCodeDto) {
    const { username, securityCode, newPassword } = body;

    this.verifyCodeOrThrow(username, securityCode);

    const { id } = await this.findByUsernameOrThrow(username);

    return await this.userRepo.update(id, { password: newPassword });
  }

  /**
   * Create new security code
   * @param username
   * @returns
   */
  protected createSecurityCode(username: string) {
    const code = new SecurityCode(username);
    console.log(code);
    this.codeStore.set(username, code);
    return code.code;
  }

  /**
   * Verify security code or throw Error
   * @param username
   * @param securityCode
   * @returns
   */
  protected verifyCodeOrThrow(username: string, securityCode: string) {
    const code = this.codeStore.get(username);
    if (code) {
      if (code.code === securityCode) {
        const currentTime = new Date().getTime();
        const codeTime = code.time.getTime();
        const difference = currentTime - codeTime;

        if (difference < 120_000) {
          // Update security code
          this.createSecurityCode(username);
          return;
        }
      }
    }
    throw new UnauthorizedException('Security code is expired!');
  }
}
