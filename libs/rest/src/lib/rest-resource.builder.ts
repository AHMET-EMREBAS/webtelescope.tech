import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Type,
  applyDecorators,
} from '@nestjs/common';
import { ApiPaths, NameResult, getApiPaths, names } from '@webpackages/utils';
import {
  CanRead,
  CanUpdate,
  CanWrite,
  IRestResourceBuilder,
  ResouceName,
  ControllerConfiguration,
  ConfigureResource,
} from '@webpackages/core';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AddRelationResponse,
  CountResponse,
  DeleteResponse,
  FindAllResponse,
  FindOneByIdResponse,
  RemoveRelationResponse,
  SaveResponse,
  SetRelationResponse,
  UnsetRelationResponse,
  UpdateResponse,
} from './api-responses';

export class RestResourceBuilder implements IRestResourceBuilder {
  public readonly RESOURCE_NAME!: string;
  public readonly NAMES!: NameResult;
  public readonly API_PATHS!: ApiPaths;

  constructor(
    public readonly entity: Type,
    public readonly config?: ControllerConfiguration<IRestResourceBuilder>
  ) {
    this.NAMES = names(this.entity.name);
    this.RESOURCE_NAME = this.NAMES.className;
    this.API_PATHS = getApiPaths(this.NAMES.fileName);
  }

  Controller() {
    return applyDecorators(
      ApiTags(this.RESOURCE_NAME + 'Controller'),
      ResouceName(this.NAMES.constName),
      ConfigureResource(this.config?.Controller),
      Controller()
    );
  }

  FindAll() {
    return applyDecorators(
      FindAllResponse(this.entity),
      ApiOperation({ summary: `Find all ${this.RESOURCE_NAME} by query` }),
      CanRead(this.RESOURCE_NAME),
      ConfigureResource(this.config?.FindAll),
      Get(this.API_PATHS.PLURAL_PATH)
    );
  }

  FindOneById() {
    return applyDecorators(
      FindOneByIdResponse(this.entity),
      ApiOperation({ summary: `Find all ${this.RESOURCE_NAME} by id` }),
      CanRead(this.RESOURCE_NAME),
      ConfigureResource(this.config?.FindOneById),
      Get(this.API_PATHS.BY_ID_PATH)
    );
  }

  Save() {
    return applyDecorators(
      SaveResponse(this.entity),
      ApiOperation({ summary: `Save ${this.RESOURCE_NAME}` }),
      CanWrite(this.RESOURCE_NAME),
      ConfigureResource(this.config?.Save),
      Post(this.API_PATHS.SINGULAR_PATH)
    );
  }

  Update() {
    return applyDecorators(
      UpdateResponse(),
      ApiOperation({ summary: `Update ${this.RESOURCE_NAME}` }),
      CanUpdate(this.RESOURCE_NAME),
      ConfigureResource(this.config?.Update),
      Put(this.API_PATHS.BY_ID_PATH)
    );
  }

  Delete() {
    return applyDecorators(
      DeleteResponse(),
      ApiOperation({ summary: `Delete ${this.RESOURCE_NAME}` }),
      CanUpdate(this.RESOURCE_NAME),
      ConfigureResource(this.config?.Delete),
      Delete(this.API_PATHS.BY_ID_PATH)
    );
  }

  AddRelation() {
    return applyDecorators(
      AddRelationResponse(this.entity),
      ApiOperation({ summary: `Add relation to ${this.RESOURCE_NAME}` }),
      CanUpdate(this.RESOURCE_NAME),
      ConfigureResource(this.config?.AddRelation),
      Put(this.API_PATHS.RELATION_NAME_AND_ID_PATH)
    );
  }

  RemoveRelation() {
    return applyDecorators(
      RemoveRelationResponse(this.entity),
      ApiOperation({ summary: `Remove relation from ${this.RESOURCE_NAME}` }),
      CanUpdate(this.RESOURCE_NAME),
      ConfigureResource(this.config?.RemoveRelation),
      Delete(this.API_PATHS.RELATION_NAME_AND_ID_PATH)
    );
  }

  SetRelation() {
    return applyDecorators(
      SetRelationResponse(this.entity),
      ApiOperation({ summary: `Set relation to ${this.RESOURCE_NAME}` }),
      CanUpdate(this.RESOURCE_NAME),
      ConfigureResource(this.config?.SetRelation),
      Post(this.API_PATHS.RELATION_NAME_AND_ID_PATH)
    );
  }

  UnsetRelation() {
    return applyDecorators(
      UnsetRelationResponse(this.entity),
      ApiOperation({ summary: `Unset relation from ${this.RESOURCE_NAME}` }),
      CanUpdate(this.RESOURCE_NAME),
      ConfigureResource(this.config?.UnsetRelation),
      Delete(this.API_PATHS.RELATION_NAME_PATH)
    );
  }

  Count() {
    return applyDecorators(
      CountResponse(),
      ApiOperation({ summary: `Count of ${this.RESOURCE_NAME}` }),
      CanRead(this.RESOURCE_NAME),
      ConfigureResource(this.config?.Count),
      Get(this.API_PATHS.COUNT_PATH)
    );
  }
}
