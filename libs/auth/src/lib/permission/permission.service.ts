import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/core';
import { Permission } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionService extends ResourceService<Permission> {
  constructor(@InjectRepository(Permission) repo: Repository<Permission>) {
    super(repo, ['name'], ['name']);
  }
}
