/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';

/**
 * Check the properties are unique, throw UnprocessableEntityExcption otherwise
 * @param repo
 * @param entity
 * @param providedUniques
 * @returns
 */
export async function validateUnique(
  repo: Repository<any>,
  entity: any,
  uniqueFields: string[]
) {
  if (uniqueFields) {
    const errors = [];
    for (const u of uniqueFields) {
      if (u) {
        const found = await repo.findOneBy({ [u]: entity[u] });

        if (found) {
          errors.push({
            property: u,
            constraints: { unique: `${u} must be unqiue!` },
          });
        }
      }
    }

    if (errors.length > 0) {
      throw new UnprocessableEntityException(errors);
    }
  }

  return;
}
