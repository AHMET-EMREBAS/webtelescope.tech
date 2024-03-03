import { DataSource, Repository } from 'typeorm';

import { Permission, Role, User } from './user.entity';

describe('User Entity', () => {
  describe('Smoke', () => {
    let ds!: DataSource;
    let permissionRepo!: Repository<Permission>;
    let roleRepo!: Repository<Role>;
    let userRepo!: Repository<User>;

    beforeAll(async () => {
      const __ds = new DataSource({
        type: 'better-sqlite3',
        database: './temp/database/user.smoke.db',
        entities: [Permission, Role, User],
        synchronize: true,
        dropSchema: true,
      });

      ds = await __ds.initialize();

      permissionRepo = ds.getRepository(Permission);
      roleRepo = ds.getRepository(Role);
      userRepo = ds.getRepository(User);
    });
    it('should create permission', async () => {
      const saved = await permissionRepo.save({ name: 'permission 1' });
      expect(saved?.name).toBe(saved.name);
    });

    it('should create role', async () => {
      const saved = await roleRepo.save({ name: 'role 1' });
      expect(saved?.name).toBe(saved.name);
    });
    it('should create user', async () => {
      const { id } = await roleRepo.save({ name: 'Sample Role' });
      const saved = await userRepo.save({
        username: 'username',
        password: 'password',
        roles: [{ id }],
      });
      expect(saved?.username).toBe(saved.username);
      expect(saved?.password).toBe(saved.password);
    });
  });
});
