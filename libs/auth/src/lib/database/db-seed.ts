import { DatabaseFactory } from './db-factory';

import { createResourcePermissions } from '@webpackages/core';
import { AuthEntities } from './db.entities';
import {
  Organization,
  Permission,
  Role,
  SubType,
  User,
} from '@webpackages/entity';
import { EntityManager } from 'typeorm';
import { ICredentials } from '@webpackages/model';

const builtinPermissions = AuthEntities.map((e) => {
  return createResourcePermissions(e.name);
}).flat();

export class DatabaseSeeder {
  /**
   * Seed new client database
   * @param orgname
   * @param credentials
   */
  static async seed(orgname: string, credentials: ICredentials) {
    const ds = await DatabaseFactory.datasource(orgname).initialize();

    try {
      await ds.transaction(async (manager: EntityManager) => {
        // Seed subscription type

        const subTypeRepo = manager.getRepository(SubType);
        const SUB_TYPE = await manager.save(
          subTypeRepo.create({
            subscriptionName: 'default',
            description: 'default subscription type',
          })
        );

        // Seed Permissions
        const permissionRepo = ds.getRepository(Permission);
        const ADMIN_PERMISSION = await manager.save(
          permissionRepo.create({ permission: 'ADMIN' })
        );
        await manager.save(
          builtinPermissions.map((permission) =>
            permissionRepo.create({ permission })
          )
        );
        // Seed role
        const roleRepo = ds.getRepository(Role);
        const ADMIN_ROLE = await manager.save(
          roleRepo.create({ role: 'ADMIN', permissions: [ADMIN_PERMISSION] })
        );

        // Seed organization
        const orgRepo = ds.getRepository(Organization);
        const ORGANIZATION = await manager.save(
          orgRepo.create({ organizationName: orgname })
        );

        // Seed Admin User
        const userRepo = ds.getRepository(User);
        const { username, password } = credentials;
        await manager.save(
          userRepo.create({
            username,
            password,
            organization: ORGANIZATION,
            roles: [ADMIN_ROLE],
          })
        );
      });
    } catch (err) {
      ds.getRepository(User).find().then(console.log);
      console.error(err);
    }
  }
}
