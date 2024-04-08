import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller()
export class UserController {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ) {}
  @Get('users')
  find() {
    return this.repo.find();
  }
}
