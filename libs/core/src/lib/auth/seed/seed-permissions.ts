/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Permission } from '../../entities';
import {
  createReadOwnPermission,
  createReadPermission,
  createWriteOwnPermission,
  createWritePermission,
} from '@webtelescopetech/common';

/**
 * Create permission for the resources
 * @param resources 
 * @param repo 
 */
export async function seedPermissions(
  resources: Type<any>[],
  repo: Repository<Permission>
) {
  const savePermission = async (permit: Permission) => {
    try {
      const found = await repo.findOneBy({ name: permit.name });
      if (!found) {
        await repo.save(permit);
      }
    } catch (err) {
      console.error(err);
    }
  };

  for (const r of resources) {
    const readP = createReadPermission(r.name);
    const readOwnP = createReadOwnPermission(r.name);

    const writeP = createWritePermission(r.name);
    const writeOwnP = createWriteOwnPermission(r.name);

    await savePermission(new Permission({ name: readP }));
    await savePermission(new Permission({ name: readOwnP }));
    await savePermission(new Permission({ name: writeP }));
    await savePermission(new Permission({ name: writeOwnP }));
  }
}
