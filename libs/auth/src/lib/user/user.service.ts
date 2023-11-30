import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ResourceService } from '@webpackages/core';
@Injectable()
export class UserService extends ResourceService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo, ['username'], ['username']);
  }
}
