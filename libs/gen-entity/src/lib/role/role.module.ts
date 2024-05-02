import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../permission/permission.entity';
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
import { Role } from './role.entity';
import { QueryRoleDto } from './query-role.dto';
import { UpdateRoleDto } from './update-role.dto';
import { CreateRoleDto } from './create-role.dto';

@Injectable()
export class RoleService extends RepositoryService<Role> {
  constructor(@InjectRepository(Role) repo: Repository<Role>) {
    super(repo);
  }
}
const RolePaths = getApiPaths(Role.name);

@Controller({
  tags: [RoleController.name],
})
export class RoleController {
  constructor(protected readonly service: RoleService) {}
  @Get({ path: RolePaths.PLURAL_PATH })
  async findAll(
    @Query() paginator: PaginatorDto,
    @Query() queryDto: QueryRoleDto
  ) {
    console.table(paginator);
    console.table(queryDto);
    return await this.service.find({ ...paginator, where: { ...queryDto } });
  }

  @Post({ path: RolePaths.SINGULAR_PATH })
  async save(@Body() body: CreateRoleDto) {
    return await this.service.saveSafe(body);
  }

  @Update({ path: RolePaths.BY_ID_PATH })
  update(@SourceId() id: number, @Body() body: UpdateRoleDto) {
    return this.service.update(id, body);
  }

  @Delete({ path: RolePaths.BY_ID_PATH })
  delete(@SourceId() id: number) {
    return this.service.delete(id);
  }

  @SetRelation({ path: RolePaths.RELATION_NAME_AND_ID_PATH })
  setRelation(@Param() param: RelationDto) {
    const { relationName, entityId, relationId } = param;
    return this.service
      .createQueryBuilder()
      .relation(relationName)
      .of(entityId)
      .set(relationId);
  }

  @UnsetRelation({ path: RolePaths.RELATION_NAME_PATH })
  unsetRelation(@Param() param: UnsetRelationDto) {
    const { relationName, entityId } = param;
    return this.service
      .createQueryBuilder()
      .relation(relationName)
      .of(entityId)
      .set(null);
  }

  @AddRelation({ path: RolePaths.RELATION_NAME_AND_ID_PATH })
  addRelation(@Param() param: RelationDto) {
    const { relationName, entityId, relationId } = param;
    return this.service
      .createQueryBuilder()
      .relation(relationName)
      .of(entityId)
      .set(relationId);
  }

  @RemoveRelation({ path: RolePaths.RELATION_NAME_AND_ID_PATH })
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
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
