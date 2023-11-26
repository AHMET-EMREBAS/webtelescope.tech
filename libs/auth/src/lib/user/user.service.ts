import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/rest';
import { User } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService extends ResourceService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo, ['name'], ['name']);
  }
}
