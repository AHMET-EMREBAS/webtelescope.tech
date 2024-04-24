import { IUser, Some } from '@webpackages/common';
import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';

export interface IUserService {
  findByUsername(username: string): Promise<Some<IUser>>;
  findById(id: number): Promise<Some<IUser>>;
}

const SampleUsers: IUser[] = [
  {
    id: 1,
    username: 'user1@gmail.com',
    password: hashSync('password1', genSaltSync(8)),
    roles: [
      {
        id: 1,
        name: 'Admin',
        permissions: [],
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
    username: 'user2@gmail.com',
    password: hashSync('password2', genSaltSync(8)),

    roles: [
      {
        id: 20,
        name: 'READ:USER',
      },
    ],
    scopes: [
      {
        id: 1,
        name: 'app',
      },
    ],
  },
] as IUser[];

@Injectable()
export class TestUserService implements IUserService {
  users: IUser[] = SampleUsers;

  constructor() {
    setTimeout(() => {
      console.table(this.users);
    }, 3000);
  }

  async findById(id: number): Promise<Some<IUser>> {
    return this.users.find((e) => e.id == id);
  }
  async findByUsername(username: string): Promise<Some<IUser>> {
    return this.users.find((e) => e.username === username);
  }
}
