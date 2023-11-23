import { Role, User } from '../../entities';

export class UserPayload {
  sub!: number;
  roles!: Partial<Role>[];

  constructor(user: User) {
    this.sub = user.id;
    this.roles = user.roles;
  }
}
