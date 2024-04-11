import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '@webpackages/entity';
import { ICreateSessionDto } from '@webpackages/model';

import { Repository } from 'typeorm';

@Injectable()
export class AuthSessionService {
  constructor(
    @InjectRepository(Session) private readonly sessionRepo: Repository<Session>
  ) {}
  async findSessionById(sessionId: number) {
    return await this.sessionRepo.findOneBy({ id: sessionId });
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
}
