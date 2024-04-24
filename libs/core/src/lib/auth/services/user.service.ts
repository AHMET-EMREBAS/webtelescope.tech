import { Some } from '@webpackages/common';
import { IAuthUser } from '../models/user';

export interface IAuthUserService {
  findByUsername(username: string): Promise<Some<IAuthUser>>;
  findById(id: number): Promise<Some<IAuthUser>>;
}

export class TestUserService implements IAuthUserService {
  users: IAuthUser[] = [
    {
      id: 1,
      password: 'password1',
      username: 'user1@gmail.com',
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
      password: 'password2',
      username: 'user2@gmail.com',

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
  ];

  constructor() {
    console.table(this.users);
  }

  async findById(id: number): Promise<Some<IAuthUser>> {
    return this.users.find((e) => e.id == id);
  }
  async findByUsername(username: string): Promise<Some<IAuthUser>> {
    return this.users.find((e) => e.username === username);
  }
}
