import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePasswordDto } from '@webpackages/dto';
import { SecurityCode, User } from '@webpackages/entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthUserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(SecurityCode)
    private readonly securityCodeRepo: Repository<SecurityCode>
  ) {}

  async findUserByUsername(username: string) {
    return await this.userRepo.findOne({
      where: { username },
      relations: ['organization', 'roles'],
      loadEagerRelations: true,
    });
  }

  async findUserByUserNameOrThrow(username: string) {
    const found = await this.findUserByUsername(username);
    if (found) return found;
    throw new UnauthorizedException('User not found!');
  }

  async findUserById(id: number) {
    return this.userRepo.findOne({
      where: { id },
      relations: ['organization', 'roles'],
      loadEagerRelations: true,
    });
  }

  async findUserByIdOrThrow(id: number) {
    const found = await this.findUserById(id);
    if (found) return found;
    throw new UnauthorizedException('User not found by id!');
  }

  async updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto) {
    await this.findUserByIdOrThrow(userId);
    return await this.userRepo.update(userId, {
      password: updatePasswordDto.password,
    });
  }

  async findUserBySecurityCode(securityCode: string) {
    await this.securityCodeRepo.find();
    const found = await this.securityCodeRepo.findOneBy({ securityCode });

    if (found) return await this.userRepo.findOneBy({ id: found.userId });

    return undefined;
  }

  async findUserBySecurityCodeOrThrow(securityCode: string) {
    const user = await this.findUserBySecurityCode(securityCode);
    if (user) return user;
    throw new UnauthorizedException('Could not find user by security code!');
  }
}
