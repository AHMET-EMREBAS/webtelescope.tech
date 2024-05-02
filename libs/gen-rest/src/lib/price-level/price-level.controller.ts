import {
  Controller,
  Get,
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
  InjectRepository,
  Repository,
  Meta,
} from '@webpackages/core';
import { getApiPaths } from '@webpackages/utils';
import {
  PriceLevel,
  PriceLevelView,
  QueryPriceLevelDto,
  UpdatePriceLevelDto,
  CreatePriceLevelDto,
} from '@webpackages/gen-entity';
import {
  PriceLevelService,
  PriceLevelViewService,
} from './price-level.service';

const Paths = getApiPaths(PriceLevel.name);

@Controller({
  tags: [PriceLevelController.name],
})
export class PriceLevelController {
  constructor(
    protected readonly service: PriceLevelService,
    protected readonly viewService: PriceLevelViewService
  ) {}

  @Get({ path: Paths.METADATA })
  async metadata(@Meta() meta: string) {
    return await this.service.getMetadata(meta);
  }

  @Get({ path: Paths.PLURAL_PATH })
  async findAll(
    @Query() paginator: PaginatorDto,
    @Query() queryDto: QueryPriceLevelDto
  ) {
    return await this.viewService.queryAll({
      ...paginator,
      where: { ...queryDto },
    });
  }

  @Get({ path: Paths.BY_ID_PATH })
  async findOneById(@SourceId() id: number) {
    return await this.viewService.findOneBy({ id } as any);
  }

  @Post({ path: Paths.SINGULAR_PATH })
  async save(@Body() body: CreatePriceLevelDto) {
    return await this.service.saveSafe(body);
  }

  @Update({ path: Paths.BY_ID_PATH })
  update(@SourceId() id: number, @Body() body: UpdatePriceLevelDto) {
    return this.service.updateSafe(id, body);
  }

  @Delete({ path: Paths.BY_ID_PATH })
  delete(@SourceId() id: number) {
    return this.service.delete(id);
  }

  @SetRelation({ path: Paths.RELATION_NAME_AND_ID_PATH })
  setRelation(@Param() param: RelationDto) {
    const { relationName, entityId, relationId } = param;
    return this.service
      .createQueryBuilder()
      .relation(relationName)
      .of(entityId)
      .set(relationId);
  }

  @UnsetRelation({ path: Paths.RELATION_NAME_PATH })
  unsetRelation(@Param() param: UnsetRelationDto) {
    const { relationName, entityId } = param;
    return this.service
      .createQueryBuilder()
      .relation(relationName)
      .of(entityId)
      .set(null);
  }

  @AddRelation({ path: Paths.RELATION_NAME_AND_ID_PATH })
  addRelation(@Param() param: RelationDto) {
    const { relationName, entityId, relationId } = param;
    return this.service
      .createQueryBuilder()
      .relation(relationName)
      .of(entityId)
      .set(relationId);
  }

  @RemoveRelation({ path: Paths.RELATION_NAME_AND_ID_PATH })
  removeRelation(@Param() param: RelationDto) {
    const { relationName, entityId, relationId } = param;
    return this.service
      .createQueryBuilder()
      .relation(relationName)
      .of(entityId)
      .set(relationId);
  }
}
