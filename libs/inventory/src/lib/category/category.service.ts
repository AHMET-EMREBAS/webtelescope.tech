import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/core';
import { Category } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService extends ResourceService<Category> {
  constructor(@InjectRepository(Category) repo: Repository<Category>) {
    super(repo, ['name'], ['name']);
  }
}
