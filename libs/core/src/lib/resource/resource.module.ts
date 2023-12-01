import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassConstructor } from 'class-transformer';
import { QueryController } from './query.controller';
import { WriteController } from './write.controller';

export type ResourceModuleOptions = {
  singularPath: string;
  pluralPath: string;
  searchFields: string[];
  entities: ClassConstructor<unknown>[];
  createDto: ClassConstructor<unknown>;
  updateDto: ClassConstructor<unknown>;
};

@Module({})
export class ResourceModule {
  static register(options: ResourceModuleOptions): DynamicModule {
    const {
      createDto,
      entities,
      pluralPath,
      singularPath,
      updateDto,
      searchFields,
    } = options;
    return {
      module: ResourceModule,
      imports: [TypeOrmModule.forFeature(entities)],
      controllers: [
        QueryController({
          entity: entities[0],
          pluralPath,
          singularPath,
          searchFields,
        }),
        WriteController({
          entity: entities[0],
          createDto,
          singularPath,
          updateDto,
        }),
      ],
    };
  }
}
