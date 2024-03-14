import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session, SessionRecord, SessionView } from './session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
    @InjectRepository(SessionView)
    private readonly sessionView: Repository<SessionView>,
    @InjectRepository(SessionRecord)
    private readonly recordRepo: Repository<SessionRecord>
  ) {}

  async createSession() {
    return await this.sessionRepo.save({});
  }

  /**
   *
   * @param id Session id
   * @param key record name
   */
  getRecord(id: number, key: string): Promise<SessionView[] | null> {
    return this.sessionView.find({ where: { id, key } });
  }

  /**
   *
   * @param id Session id
   * @param key Record name
   * @param value Record value
   */
  async setRecord(id: number, key: string, value: string) {
    return await this.recordRepo.save({
      key,
      value,
      session: { id },
    });
  }

  /**
   * Clear session and all its records.
   * @param id Session id
   * @returns
   */
  clear(id: number) {
    return this.sessionRepo.delete(id);
  }
}
