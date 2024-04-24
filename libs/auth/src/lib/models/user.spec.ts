import { DataSource, Repository } from 'typeorm';
import { Role, RoleView } from './role';
import { User } from './user';
import { Permission } from './permission';
import { Scope } from './scope';

describe('User model', () => {
  let role: Repository<Role>;
  let permission: Repository<Permission>;
  let user: Repository<User>;
  let scope: Repository<Scope>;

  let roleView: Repository<RoleView>;

  beforeAll(async () => {
    const ds = await new DataSource({
      type: 'better-sqlite3',
      database: './tmp/test/database.test.sqlite',
      // type: 'postgres',
      // username: 'postgres',
      // password: 'password',
      // database: 'devdb',
      entities: [User, Role, Permission, Scope, RoleView],
      synchronize: true,
      dropSchema: true,
    }).initialize();

    role = ds.getRepository(Role);
    permission = ds.getRepository(Permission);
    user = ds.getRepository(User);
    scope = ds.getRepository(Scope);
    roleView = ds.getRepository(RoleView);

    const p1 = await permission.save({ name: 'p1' });
    const p2 = await permission.save({ name: 'p2' });
    const p3 = await permission.save({ name: 'p3' });

    await role.save({ name: 'r1', permissions: [p1, p2] });
    await role.save({ name: 'r2', permissions: [p1, p2, p3] });
    await role.save({ name: 'r3', permissions: [p3] });
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
});
