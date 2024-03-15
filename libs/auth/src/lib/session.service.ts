/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session, SessionRecord, SessionView, User } from '@webpackages/entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
    @InjectRepository(SessionRecord)
    private readonly recordRepo: Repository<SessionRecord>,
    @InjectRepository(SessionView)
    private readonly sessionview: Repository<SessionView>
  ) {}

  getSession(id: number) {
    return this.sessionRepo.findOneBy({ id });
  }
  
  createSession(user: User): Promise<Session> {
    return this.sessionRepo.save({ user });
  }

  async setRecord(
    sessionId: number,
    key: string,
    value: any
  ): Promise<SessionRecord> {
    const found = await this.getRecord(sessionId, key);
    if (found) {
      return await this.recordRepo.save({ id: found.id, key, value });
    } else {
      return await this.recordRepo.save({
        key,
        value,
        session: { id: sessionId },
      });
    }
  }

  async getRecord(sessionId: number, key: string): Promise<SessionView | null> {
    return await this.sessionview.findOneBy({ id: sessionId, key });
  }

  async deleteRecord(sessionId: number, key: string) {
    const found = await this.sessionview.find({
      where: { id: sessionId, key },
    });

    if (found) {
      return await this.recordRepo.delete(found.map((e) => e.id));
    }

    return null;
  }

  async deleteSession(id: number) {
    return await this.sessionRepo.delete(id);
  }
}
