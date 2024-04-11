import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePasswordDto } from '@webpackages/dto';
import { SecurityCode, User } from '@webpackages/entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthUserService {
  private readonly logger!: Logger;
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(SecurityCode)
    private readonly securityCodeRepo: Repository<SecurityCode>
  ) {
    this.logger = new Logger(AuthUserService.name);
  }

  async findUserByUsername(username: string) {
    const result = await this.userRepo.findOne({
      where: { username },
      relations: ['organization', 'roles'],
      loadEagerRelations: true,
    });
    return result;
  }

  async findUserByUserNameOrThrow(username: string) {
    const found = await this.findUserByUsername(username);
    if (found) {
      this.logger.debug(`Found user by username ${username} : ${found}`);
      return found;
    }
    this.logger.error(`Could not find the user by username ${username}!`);
    throw new UnauthorizedException('User not found!');
  }

  async findUserById(id: number) {
    const result = this.userRepo.findOne({
      where: { id },
      relations: ['organization', 'roles'],
      loadEagerRelations: true,
    });

    this.logger.debug(`Found user by id ${id} : ${result}`);
    return result;
  }

  async findUserByIdOrThrow(id: number) {
    const found = await this.findUserById(id);
    if (found) return found;
    throw new UnauthorizedException('User not found by id!');
  }

  async updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto) {
    await this.findUserByIdOrThrow(userId);
    this.logger.debug(
      `Trying to update user password by userID ${userId} with ${updatePasswordDto}`
    );
    return await this.userRepo.update(userId, {
      password: updatePasswordDto.password,
    });
  }

  async findUserBySecurityCode(securityCode: string) {
    await this.securityCodeRepo.find();
    const found = await this.securityCodeRepo.findOneBy({ securityCode });

    this.logger.debug(`Found user by securityCode : ${found}`);
    if (found) return await this.userRepo.findOneBy({ id: found.userId });

    return undefined;
  }

  async findUserBySecurityCodeOrThrow(securityCode: string) {
    const user = await this.findUserBySecurityCode(securityCode);
    if (user) return user;
    throw new UnauthorizedException('Could not find user by security code!');
  }
}
