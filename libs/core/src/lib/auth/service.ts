/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectRepository } from '@nestjs/typeorm';
import { Mail, SecurityCode, Session, Sub, User } from '@webpackages/entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import {
  CreateMailDto,
  CreateSubDto,
  UpdatePasswordDto,
} from '@webpackages/dto';
import { v4 } from 'uuid';
import { ICreateSessionDto, SessionPayload } from '@webpackages/model';
import { BaseAuthService } from './base-auth-service';

@Injectable()
export class AuthService extends BaseAuthService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepo: Repository<User>,

    @InjectRepository(Session)
    protected readonly sessionRepo: Repository<Session>,

    @InjectRepository(Sub)
    protected readonly subRepo: Repository<Sub>,

    @InjectRepository(SecurityCode)
    private readonly tokenRepo: Repository<SecurityCode>,

    @InjectRepository(Mail)
    protected readonly mailRepo: Repository<Mail>,
    protected readonly jwt: JwtService,
    reflector: Reflector
  ) {
    super(reflector);
  }

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
    await this.tokenRepo.find();
    const found = await this.tokenRepo.findOneBy({ securityCode });

    if (found) return await this.userRepo.findOneBy({ id: found.userId });

    return undefined;
  }

  async findUserBySecurityCodeOrThrow(securityCode: string) {
    const user = await this.findUserBySecurityCode(securityCode);
    if (user) return user;
    throw new UnauthorizedException('Could not find user by security code!');
  }

  async createSecurityCode(user: User) {
    const { id } = await this.tokenRepo.save({ securityCode: v4(), user });
    return await this.tokenRepo.findOneBy({ id });
  }

  async createSecurityCodeOrThrow(user: User) {
    const securityCode = await this.createSecurityCode(user);
    if (securityCode) return securityCode;
    throw new UnauthorizedException('Could not create security code!');
  }

  findSessionById(sessionId: number) {
    return this.sessionRepo.findOneBy({ id: sessionId });
  }

  async findSessionByIdOrThrow(sessionId: number): Promise<Session> | never {
    const found = await this.findSessionById(sessionId);
    if (found) return found;

    throw new UnauthorizedException('Session not found!');
  }

  async createSession(session: ICreateSessionDto) {
    return await this.sessionRepo.save(session);
  }

  async deleteSession(sessionId: number) {
    return await this.sessionRepo.delete(sessionId);
  }

  async findSessionsByUserId(userId: number) {
    return await this.sessionRepo.find({ where: { userId } });
  }

  async deleteAllSessionsByUserId(userId: number) {
    return await this.sessionRepo.delete({ userId });
  }

  signToken(session: Session) {
    return this.jwt.sign({ sub: session.id });
  }

  verifyToken(token: string): SessionPayload {
    try {
      return this.jwt.verify<SessionPayload>(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async signup(signupDto: CreateSubDto) {
    const found = await this.subRepo.findOneBy({
      username: signupDto.username,
    });

    if (found) {
      throw new UnprocessableEntityException(
        'The username is already in user!'
      );
    }
    const saved = await this.subRepo.save(signupDto);

    return saved;
  }

  async sendEmail(mail: CreateMailDto) {
    return await this.mailRepo.save(mail);
  }
}
