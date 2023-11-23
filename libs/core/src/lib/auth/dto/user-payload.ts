import { User } from '../../entities';

export class UserPayload {
  sub!: number;
  roles!: Partial<{ name: string; permissions: { name: string }[] }>[];

  constructor(user: User) {
    this.sub = user.id;
    this.roles = user.roles.map((r) => ({
      name: r.name,
      permissions: r.permissions.map((p) => ({ name: p.name })),
    }));
  }
}
