import { DataSource } from 'typeorm';
import {
  createResoucePermissions,
  seedPermissions,
  seedRoles,
  seedSubTypes,
} from './seeder';
import {
  LogSubscriber,
  Permission,
  Role,
  SubSubscriber,
  SubType,
} from '@webpackages/entity';
import { AuthEntities } from './auth-entities';
import { join } from 'path';

export async function initializeDataSource(orgName: string) {
  return await new DataSource({
    type: 'better-sqlite3',
    database: join(__dirname, 'database', `auth-${orgName}.sqlite`),
    entities: AuthEntities,
    subscribers: [SubSubscriber, LogSubscriber],
    synchronize: true,
  }).initialize();
}
export async function seedNewDatabase(ds: DataSource) {
  const ADMIN_ROLE_NAME = 'ADMIN';
  const roleRepo = ds.getRepository(Role);
  const permissionRepo = ds.getRepository(Permission);
  const subTypeRepo = ds.getRepository(SubType);

  await seedPermissions(permissionRepo, [{ permission: ADMIN_ROLE_NAME }]);

  const adminPermission = await permissionRepo.findOneBy({
    permission: ADMIN_ROLE_NAME,
  });

  await seedRoles(roleRepo, [
    {
      role: ADMIN_ROLE_NAME,
      permissions: [
        {
          id: adminPermission!.id,
        },
      ],
    },
  ]);

  await seedPermissions(permissionRepo, [
    ...AuthEntities.map((e) => createResoucePermissions(e.name)).flat(),
  ]);

  await seedSubTypes(subTypeRepo, [
    {
      subscriptionName: 'default',
      description: 'Default sub type',
    },
  ]);
}
