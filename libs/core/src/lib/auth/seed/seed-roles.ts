import { Repository } from 'typeorm';
import { Role } from '../../entities';
import { ADMIN_ROLE_NAME } from '@webtelescopetech/common';

export async function createAdminRole(repo: Repository<Role>) {
  const found = await repo.findOneBy({ name: ADMIN_ROLE_NAME });
  if (!found) {
    return await repo.save({ name: ADMIN_ROLE_NAME });
  }
  return found;
}

