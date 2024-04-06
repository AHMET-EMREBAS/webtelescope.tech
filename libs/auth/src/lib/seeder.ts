import {
  PermissionActionType,
  PermissionActionlist,
  toPermissionString,
} from '@webpackages/core';
import {
  CreatePermissionDto,
  CreateRoleDto,
  CreateSubDto,
  CreateSubTypeDto,
} from '@webpackages/dto';
import { Permission, Role, Sub, SubType } from '@webpackages/entity';
import { ICreatePermissionDto, IID } from '@webpackages/model';
import { DeepPartial, Repository } from 'typeorm';

export function createResoucePermission(
  action: PermissionActionType,
  resourceName: string
): ICreatePermissionDto {
  return { permission: toPermissionString(action, resourceName) };
}

export function createResoucePermissions(
  resouceName: string
): ICreatePermissionDto[] {
  return PermissionActionlist.map((e) => {
    return createResoucePermission(e, resouceName);
  });
}

export async function seedEntities<T extends IID, C extends DeepPartial<T>>(
  repo: Repository<T>,
  items: C[]
) {
  for (const r of items) {
    try {
      await repo.save(r);
    } catch (err) {
      // Ignore here
    }
  }
}
export async function seedPermissions(
  repo: Repository<Permission>,
  permissions: CreatePermissionDto[]
) {
  await seedEntities(repo, permissions);
}

export async function seedRoles(
  repo: Repository<Role>,
  roles: CreateRoleDto[]
) {
  await seedEntities(repo, roles);
}

export async function seedSubs(repo: Repository<Sub>, subs: CreateSubDto[]) {
  await seedEntities(repo, subs);
}

export async function seedSubTypes(
  repo: Repository<SubType>,
  types: CreateSubTypeDto[]
) {
  await seedEntities(repo, types);
}
