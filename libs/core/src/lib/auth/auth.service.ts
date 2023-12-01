import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, SignupDto } from './dtos';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    protected readonly jwtService: JwtService,
    protected readonly userRepo: Repository<User>
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    const { username, password } = loginDto;

    const foundUser = await this.userRepo.findOneBy({ username });

    if (foundUser) {
      const { password: hashedPassword, id } = foundUser;

      const isPasswordMatch = await compare(password, hashedPassword);

      if (isPasswordMatch) {
        return this.jwtService.sign({ sub: id });
      }
      throw new UnauthorizedException('Password is wrong!');
    }

    throw new NotFoundException('User not found!');
  }

  async signup(signupDto: SignupDto): Promise<string> {
    const { username } = signupDto;
    const foundUser = await this.userRepo.findOneBy({ username });

    if (foundUser) {
      throw new UnauthorizedException('Username is alreayd in use!');
    }
    const savedUser = await this.userRepo.save(signupDto);
    return this.jwtService.sign({ sub: savedUser.id });
  }
}
