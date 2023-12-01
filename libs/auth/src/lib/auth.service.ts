import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './resources';
import { LoginDto, SignupDto, AuthPayload, SUBSCRIBER_ROLE } from './auth';

@Injectable()
export class AuthService {
  constructor(
    protected readonly jwtService: JwtService,
    @InjectRepository(User) protected readonly userRepo: Repository<User>,
    @InjectRepository(Role) protected readonly roleRepo: Repository<Role>
  ) {}

  async findOneById(id: number) {
    return this.userRepo.findOneBy({ id });
  }
  async findOneByUsername(username: string): Promise<User | null> {
    return await this.userRepo.findOneBy({ username });
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { username, password } = loginDto;

    const foundUser = await this.findOneByUsername(username);

    if (foundUser) {
      const { password: hashedPassword } = foundUser;

      const isPasswordMatch = await compare(password, hashedPassword);

      if (isPasswordMatch) {
        return this.signToken(foundUser);
      }
      throw new UnauthorizedException('Password is wrong!');
    }

    throw new NotFoundException('User not found!');
  }

  async signup(signupDto: SignupDto): Promise<string> {
    const { username } = signupDto;
    const foundUser = await this.userRepo.findOneBy({ username });

    if (foundUser)
      throw new UnauthorizedException('Username is alreayd in use!');

    const savedUser = await this.createSubscriber(signupDto);

    return this.signToken(savedUser);
  }

  signToken(user: User) {
    return this.jwtService.sign({ sub: user.id });
  }

  async verifyToken(token: string): Promise<User | null> {
    try {
      const authPayload: AuthPayload = this.jwtService.verify(token);
      return await this.findOneById(authPayload.sub);
    } catch (err) {
      throw new UnauthorizedException('Session Expired!');
    }
  }

  async createSubscriber(signupDto: SignupDto): Promise<User> {
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
}
