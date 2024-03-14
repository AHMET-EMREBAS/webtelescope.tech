import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto';
import { Repository } from 'typeorm';
import { IAuthUser } from './entity/user';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthEnum } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly repo: Repository<IAuthUser>,
    private readonly jwt: JwtService
  ) {}

  findByUsername(username: string) {
    return this.repo.findOneBy({ username });
  }

  passwordMatch(password: string, hashedPassword: string) {
    return compareSync(password, hashedPassword);
  }
  /**
   * Find user by username and compare the password,
   * If the password matches, then return token
   */
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const found = await this.findByUsername(username);

    if (found) {
      if (this.passwordMatch(password, found.password)) {
        const token = await this.jwt.signAsync({ sub: found.id });

        return { [AuthEnum.AUTH_TOKEN]: token };
      }
    }
    throw new UnauthorizedException('User not found!');
  }
}
