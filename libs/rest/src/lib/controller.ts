import {
  AddRelationDto,
  QueryDto,
  RemoveRelationDto,
  SetRelationDto,
  UnsetRelationDto,
} from '@webpackages/dto';
import { ObjectIDDto } from '@webpackages/property';

export interface IController<E, CreateDto, UpdateDto> {
  findAll(query: QueryDto<E>): Promise<E[]>;
  findOneById(query: ObjectIDDto): Promise<E>;
  save(entity: CreateDto): Promise<E>;
  update(query: ObjectIDDto, entity: UpdateDto): Promise<E>;
  delete(query: ObjectIDDto): Promise<E>;
  addRelation(relation: AddRelationDto): Promise<E>;
  removeRelation(relation: RemoveRelationDto): Promise<E>;
  setRelation(relation: SetRelationDto): Promise<E>;
  unsetRelation(relation: UnsetRelationDto): Promise<E>;
  count(): Promise<number>;
}
