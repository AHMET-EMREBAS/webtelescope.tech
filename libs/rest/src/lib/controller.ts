import {
  AddRelationDto,
  DeleteResult,
  QueryDto,
  RemoveRelationDto,
  SetRelationDto,
  UnsetRelationDto,
  UpdateResult,
} from '@webpackages/dto';
import { ObjectIDDto } from '@webpackages/property';

export interface IController<E, CreateDto, UpdateDto> {
  findAll(query: QueryDto<E>): Promise<E[]>;
  findOneById(query: ObjectIDDto): Promise<E>;
  save(entity: CreateDto): Promise<E>;
  update(query: ObjectIDDto, entity: UpdateDto): Promise<UpdateResult>;
  delete(query: ObjectIDDto): Promise<DeleteResult>;
  addRelation(relation: AddRelationDto): Promise<E>;
  removeRelation(relation: RemoveRelationDto): Promise<E>;
  setRelation(relation: SetRelationDto): Promise<E>;
  unsetRelation(relation: UnsetRelationDto): Promise<E>;
  count(): Promise<number>;
}
