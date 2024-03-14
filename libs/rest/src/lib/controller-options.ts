/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericQueryDto } from '@webpackages/entity';
import { ClassConstructor } from 'class-transformer';

export type ResourceControllerOptions = {
  resourceName: string;
  singularName: string;
  pluralName: string;
  entity: ClassConstructor<any>;
  createDto: ClassConstructor<any>;
  updateDto: ClassConstructor<any>;
  readDto: ClassConstructor<any>;
  queryDto: ClassConstructor<GenericQueryDto>;
};
