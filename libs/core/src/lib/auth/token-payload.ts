import { Role, User } from '../entities';

export class TokenPayload {
  sub!: number;
  roles?: Role[];
  username!: string;
  constructor(user: User) {
    this.sub = user.id!;
    this.roles = user.roles;
    this.username = user.username;
  }

  toPlain() {
    return {
      sub: this.sub,
      username: this.username,
      roles: this.roles?.map((e) => ({
        name: e.name,
        permissions: e.permissions?.map((k) => ({ name: k.name })),
      })),
    };
  }
}
