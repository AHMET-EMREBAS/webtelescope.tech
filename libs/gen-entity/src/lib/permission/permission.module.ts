import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Controller,
  Get,
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
  Query,
  Body,
  PaginatorDto,
  Post,
  Update,
  SetRelation,
  SourceId,
  Delete,
  RelationDto,
  Param,
  UnsetRelation,
  UnsetRelationDto,
  AddRelation,
  RemoveRelation,
} from '@webpackages/core';
import { getApiPaths } from '@webpackages/utils';
import { Permission } from './permission.entity';
import { QueryPermissionDto } from './query-permission.dto';
import { UpdatePermissionDto } from './update-permission.dto';
import { CreatePermissionDto } from './create-permission.dto';

@Injectable()
export class PermissionService extends RepositoryService<Permission> {
  constructor(@InjectRepository(Permission) repo: Repository<Permission>) {
    super(repo);
  }
}
const PermissionPaths = getApiPaths(Permission.name);

@Controller({
  tags: [PermissionController.name],
})
export class PermissionController {
  constructor(protected readonly service: PermissionService) {}
  @Get({ path: PermissionPaths.PLURAL_PATH })
  async findAll(
    @Query() paginator: PaginatorDto,
    @Query() queryDto: QueryPermissionDto
  ) {
    console.table(paginator);
    console.table(queryDto);
    return await this.service.find({ ...paginator, where: { ...queryDto } });
  }

  @Post({ path: PermissionPaths.SINGULAR_PATH })
  async save(@Body() body: CreatePermissionDto) {
    return await this.service.saveSafe(body);
  }

  @Update({ path: PermissionPaths.BY_ID_PATH })
  update(@SourceId() id: number, @Body() body: UpdatePermissionDto) {
    return this.service.updateSafe(id, body);
  }

  @Delete({ path: PermissionPaths.BY_ID_PATH })
  delete(@SourceId() id: number) {
    return this.service.delete(id);
  }

  @SetRelation({ path: PermissionPaths.RELATION_NAME_AND_ID_PATH })
  setRelation(@Param() param: RelationDto) {
    const { relationName, entityId, relationId } = param;
    return this.service
      .createQueryBuilder()
      .relation(relationName)
      .of(entityId)
      .set(relationId);
  }

  @UnsetRelation({ path: PermissionPaths.RELATION_NAME_PATH })
  unsetRelation(@Param() param: UnsetRelationDto) {
    const { relationName, entityId } = param;
    return this.service
      .createQueryBuilder()
      .relation(relationName)
      .of(entityId)
      .set(null);
  }

  @AddRelation({ path: PermissionPaths.RELATION_NAME_AND_ID_PATH })
  addRelation(@Param() param: RelationDto) {
    const { relationName, entityId, relationId } = param;
    return this.service
      .createQueryBuilder()
      .relation(relationName)
      .of(entityId)
      .set(relationId);
  }

  @RemoveRelation({ path: PermissionPaths.RELATION_NAME_AND_ID_PATH })
  removeRelation(@Param() param: RelationDto) {
    const { relationName, entityId, relationId } = param;
    return this.service
      .createQueryBuilder()
      .relation(relationName)
      .of(entityId)
      .set(relationId);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
