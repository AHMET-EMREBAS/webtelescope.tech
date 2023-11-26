import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/rest';
import { Message } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService extends ResourceService<Message> {
  constructor(@InjectRepository(Message) repo: Repository<Message>) {
    super(repo, ['name'], ['name']);
  }
}
