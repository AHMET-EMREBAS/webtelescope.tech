import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/rest';
import { Comment } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService extends ResourceService<Comment> {
  constructor(@InjectRepository(Comment) repo: Repository<Comment>) {
    super(repo, ['name'], ['name']);
  }
}
