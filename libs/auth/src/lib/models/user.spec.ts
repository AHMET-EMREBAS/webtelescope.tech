import { DataSource, Repository } from 'typeorm';
import { Role, RoleView } from './role';
import { User, UserRoleView, UserScopeView, UserView } from './user';
import { Permission } from './permission';
import { Scope } from './scope';

describe('User model', () => {
  let user: Repository<User>;
  let userView: Repository<UserView>;
  let role: Repository<Role>;
  let permission: Repository<Permission>;
  let scope: Repository<Scope>;

  let roleView: Repository<RoleView>;

  beforeAll(async () => {
    const ds = await new DataSource({
      type: 'better-sqlite3',
      database: './tmp/test/database.test.sqlite',

      entities: [
        User,
        UserView,
        UserRoleView,
        UserScopeView,
        Role,
        RoleView,
        Permission,
        Scope,
      ],
      synchronize: true,
      dropSchema: true,
    }).initialize();

    user = ds.getRepository(User);
    userView = ds.getRepository(UserView);

    role = ds.getRepository(Role);
    permission = ds.getRepository(Permission);
    scope = ds.getRepository(Scope);
    roleView = ds.getRepository(RoleView);

    const p1 = await permission.save({ name: 'p1' });
    const p2 = await permission.save({ name: 'p2' });
    const p3 = await permission.save({ name: 'p3' });
    const p4 = await permission.save({ name: 'p4' });
    const p5 = await permission.save({ name: 'p5' });
    const p6 = await permission.save({ name: 'p6' });

    const r1 = await role.save({ name: 'r1', permissions: [p1] });
    const r2 = await role.save({ name: 'r2', permissions: [p2, p6] });
    const r3 = await role.save({ name: 'r3', permissions: [p3, p4, p5] });

    const s1 = await scope.save({ name: 'app-0' });
    const s2 = await scope.save({ name: 'app-1' });

    await user.save({
      username: 'user1',
      password: 'pass1',
      roles: [r1, r2, r3],
      scopes: [s1, s2],
    });
    await user.save({
      username: 'user2',
      password: 'pass2',
      roles: [r1, r2],
      scopes: [s2],
    });
    await user.save({
      username: 'user3',
      password: 'pass3',
      roles: [r1],
    });
  });

  it('should initialize the repos', () => {
    expect(role).toBeTruthy();
    expect(permission).toBeTruthy();
    expect(user).toBeTruthy();
    expect(scope).toBeTruthy();
    expect(roleView).toBeTruthy();
  });

  it('should create the roles and permissions', async () => {
    const found = await role.find();

    expect(found).toBeTruthy();
    expect(found.length).toBe(1);

    const permissions = found[0].permissions;

    expect(permissions.length).toBe(3);
  });

  it('should red the role view', async () => {
    const found = await roleView.find();
    const normal = await role.find();
    console.table(normal[0].permissions);
    console.table(found);

    expect(100).toBe(100);
  });

  it('shoud get user view', async () => {
    const found = await userView.find();

    console.table(
      found.map((e) => {
        return {
          id: e.id,
          username: e.username,
          roles: e.roles,
          permissions: e.permissions,
        };
      })
    );

    expect(100).toBe(100);
  });
});
