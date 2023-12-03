import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassConstructor } from 'class-transformer';
import { BuildController } from './create-controller';
import { provideService } from '../services';

export type RestModuleOptions = {
  singularPath: string;
  pluralPath: string;
  entities: ClassConstructor<unknown>[];
  createDto: ClassConstructor<unknown>;
  updateDto: ClassConstructor<unknown>;
};

@Module({})
export class RestModule {
  static register(options: RestModuleOptions): DynamicModule {
    const { singularPath, pluralPath, entities, createDto, updateDto } =
      options;
    const entity = entities[0];
    return {
      module: RestModule,
      imports: [TypeOrmModule.forFeature(options.entities)],
      controllers: [
        BuildController({
          singularPath,
          pluralPath,
          entity,
          createDto,
          updateDto,
        }),
      ],
      providers: [provideService(entity)],
    };
  }
}
