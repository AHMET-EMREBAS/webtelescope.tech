/* eslint-disable @typescript-eslint/no-explicit-any */
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassConstructor } from 'class-transformer';
export type CreateControllerOptions = {
  entity: ClassConstructor<any>;
  createDto: ClassConstructor<any>;
};
export function CreateController(options: CreateControllerOptions) {
  class _CreateController {
    constructor(
      @InjectRepository(options.entity) public readonly repo: Repository<any>
    ) {}

    create(entity: any) {
      return this.repo.save(entity);
    }
  }

  return _CreateController;
}
