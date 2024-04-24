import { Some, IUser, IRole, IPermission, IScope } from '@webpackages/common';
import { IUserService, InjectRepository, Injectable } from '@webpackages/core';
import { User } from '../models';
import { Repository } from 'typeorm';

@Injectable()
export class RootUserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ) {}

  async findByUsername(
    username: string
  ): Promise<Some<IUser<IRole<IPermission>, IScope>>> {
    return (await this.repo.findOneBy({ username })) ?? undefined;
  }
  async findById(id: number): Promise<Some<IUser<IRole<IPermission>, IScope>>> {
    return (await this.repo.findOneBy({ id })) ?? undefined;
  }
}
