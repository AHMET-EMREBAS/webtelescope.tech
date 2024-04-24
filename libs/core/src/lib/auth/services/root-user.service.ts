import { Some } from '@webpackages/common';
import { IAuthUser } from '../models/user';
import { Injectable } from '@nestjs/common';
import { IUserService } from './user.service';
import { genSaltSync, hashSync } from 'bcrypt';

const SampleRootUsers = [
  {
    id: 1,
    username: 'root1@gmail.com',
    password: hashSync('password1', genSaltSync(8)),
    roles: [
      {
        id: 1,
        name: 'Root',
      },
    ],
    scopes: [
      {
        id: 1,
        name: 'app',
      },
    ],
  },
  {
    id: 2,
    username: 'root2@gmail.com',
    password: hashSync('password2', genSaltSync(8)),
    roles: [
      {
        id: 20,
        name: 'ROOT',
      },
    ],
    scopes: [
      {
        id: 1,
        name: 'app',
      },
    ],
  },
];
@Injectable()
export class TestRootUserService implements IUserService {
  users: IAuthUser[] = SampleRootUsers;

  constructor() {
    setTimeout(() => {
      console.table(this.users);
    }, 2000);
  }

  async findById(id: number): Promise<Some<IAuthUser>> {
    return this.users.find((e) => e.id == id);
  }
  async findByUsername(username: string): Promise<Some<IAuthUser>> {
    return this.users.find((e) => e.username === username);
  }
}
