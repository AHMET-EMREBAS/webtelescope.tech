import { Delete, Get, Post, Put, applyDecorators as apl } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { IDDto } from '../dtos';
import { ResourceMetadata } from './resource-metadata';
import { RestPaths } from './rest-paths';

export class HttpMethod {
  protected readonly P!: RestPaths;
  constructor(protected readonly options: Readonly<ResourceMetadata>) {
    this.P = new RestPaths(options);
  }

  FindAll(): PropertyDecorator {
    return apl(
      ApiOperation({ summary: 'Find all items' }),
      ApiOkResponse({ type: this.options.readDto, isArray: true }),
      ApiUnauthorizedResponse(),
      Get(this.P.FIND_ALL)
    );
  }

  FindOneByID(): PropertyDecorator {
    return apl(
      ApiOperation({ summary: 'Find item by id' }),
      ApiOkResponse({ type: this.options.readDto }),
      ApiNotFoundResponse(),
      Get(this.P.FIND_ONE_BY_ID)
    );
  }

  SaveOne(): PropertyDecorator {
    return apl(
      ApiBody({ type: this.options.createDto }),
      ApiOperation({ summary: 'Save entity' }),
      ApiCreatedResponse({ type: this.options.readDto }),
      ApiUnprocessableEntityResponse({ description: 'Input validation error' }),
      Post(this.P.SAVE_ONE)
    );
  }

  SaveMany(): PropertyDecorator {
    return apl(
      ApiBody({ type: this.options.createDto, isArray: true }),
      ApiOperation({ summary: 'Save entities' }),
      ApiCreatedResponse({ type: this.options.readDto, isArray: true }),
      ApiUnprocessableEntityResponse({ description: 'Input validation error' }),
      Post(this.P.SAVE_MANY)
    );
  }

  UpdateOne(): PropertyDecorator {
    return apl(
      ApiOperation({ summary: 'Upate item by id' }),
      ApiBody({ type: this.options.updateDto }),
      ApiOkResponse({ type: this.options.readDto }),
      ApiUnprocessableEntityResponse(),
      Put(this.P.UPDATE_ONE)
    );
  }

  UpdateMany(): PropertyDecorator {
    return apl(
      ApiOperation({ summary: 'Upate many items' }),
      ApiBody({ type: this.options.updateDto, isArray: true }),
      ApiOkResponse({ type: this.options.readDto, isArray: true }),
      ApiUnprocessableEntityResponse(),
      Put(this.P.UPDATE_MANY)
    );
  }

  DeleteOne(): PropertyDecorator {
    return apl(
      ApiOperation({ summary: 'Delete item by id' }),
      ApiOkResponse(),
      ApiNotFoundResponse(),
      Delete(this.P.DELETE_ONE)
    );
  }

  DeleteMany(): PropertyDecorator {
    return apl(
      ApiOperation({ summary: 'Delete items by ids' }),
      ApiOkResponse(),
      ApiNotFoundResponse(),
      ApiBody({ type: IDDto, isArray: true }),
      Delete(this.P.DELETE_MANY)
    );
  }

  AddRelation() {
    return apl(
      ApiOperation({ summary: 'Add Relation' }),
      ApiOkResponse(),
      ApiNotFoundResponse(),
      Put(this.P.ADD_RELATION)
    );
  }

  RemoveRelation() {
    return apl(
      ApiOperation({ summary: 'Remove Relation' }),
      ApiOkResponse(),
      ApiNotFoundResponse(),
      Delete(this.P.REMOVE_RELATION)
    );
  }

  SetRelation() {
    return apl(
      ApiOperation({ summary: 'Set Relation' }),
      ApiOkResponse(),
      ApiNotFoundResponse(),
      Post(this.P.SET_RELATION)
    );
  }

  UnsetRelation() {
    return apl(
      ApiOperation({ summary: 'Unset Relation' }),
      ApiOkResponse(),
      ApiNotFoundResponse(),
      Delete(this.P.UNSET_RELATION)
    );
  }

  Count(): PropertyDecorator {
    return apl(
      ApiOperation({ summary: 'Items count' }),
      ApiOkResponse({ type: 'number' }),
      Get(this.P.COUNT)
    );
  }
}
