import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/rest';
import { Role } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleService extends ResourceService<Role> {
  constructor(@InjectRepository(Role) repo: Repository<Role>) {
    super(repo, ['name'], ['name']);
  }
}
