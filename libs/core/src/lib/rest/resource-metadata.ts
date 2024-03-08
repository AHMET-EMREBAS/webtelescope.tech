import { ClassConstructor } from 'class-transformer';

export type ResourceMetadata = {
  pluralPath: string;
  singularPath: string;
  entity: ClassConstructor<unknown>;
  createDto: ClassConstructor<unknown>;
  readDto: ClassConstructor<unknown>;
  updateDto: ClassConstructor<unknown>;
};
