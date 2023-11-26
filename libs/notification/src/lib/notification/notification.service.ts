import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/rest';
import { Notification } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService extends ResourceService<Notification> {
  constructor(@InjectRepository(Notification) repo: Repository<Notification>) {
    super(repo, ['name'], ['name']);
  }
}
