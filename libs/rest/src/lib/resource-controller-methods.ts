import { Delete, Get, Post, Put, applyDecorators } from '@nestjs/common';
import { RouteBuilder } from '@webpackages/route-builder';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
  PickType,
} from '@nestjs/swagger';
import { ResourceControllerOptions } from './controller-options';

export class ResourceControllerMethods {
  readonly routes = new RouteBuilder(
    this.options.singularName,
    this.options.pluralName
  );

  constructor(protected readonly options: ResourceControllerOptions) {}

  FIND_ALL() {
    return applyDecorators(
      ApiOperation({ summary: 'Find all entities by query.' }),
      ApiOkResponse({
        type: this.options.readDto,
        isArray: true,
        description: 'Success',
      }),
      ApiQuery({ type: this.options.queryDto }),
      ApiUnprocessableEntityResponse({ description: 'Invalid query options.' }),
      ApiUnauthorizedResponse({ description: 'Unautorized user.' }),
      ApiInternalServerErrorResponse({ description: 'Unexpected errors.' }),
      Get(this.routes.FIND_ALL)
    );
  }

  FIND_ONE_BY_ID() {
    return applyDecorators(
      ApiOperation({ summary: 'Find one entity by id.' }),
      ApiOkResponse({ type: this.options.readDto, description: 'Success' }),
      ApiQuery({
        type: PickType(this.options.queryDto, ['select', 'withDeleted']),
      }),
      ApiNotFoundResponse({ description: 'Entity not found.' }),
      ApiUnauthorizedResponse({ description: 'Unautorized user.' }),
      ApiInternalServerErrorResponse({ description: 'Unexpected errors.' }),
      Get(this.routes.FIND_ONE_BY_ID)
    );
  }

  CREATE() {
    return applyDecorators(
      ApiBody({ type: this.options.createDto }),
      ApiOperation({ summary: 'Create one entity.' }),
      ApiOkResponse({ type: this.options.readDto, description: 'Success' }),
      ApiUnprocessableEntityResponse({
        description: 'Input validation failed.',
      }),
      ApiUnauthorizedResponse({ description: 'Unautorized user.' }),
      ApiInternalServerErrorResponse({ description: 'Unexpected errors.' }),
      Post(this.routes.CREATE)
    );
  }

  UPDATE_ONE_BY_ID() {
    return applyDecorators(
      ApiBody({ type: this.options.updateDto }),
      ApiOperation({ summary: 'Update one entity by id.' }),
      ApiOkResponse({ description: 'Success' }),
      ApiUnprocessableEntityResponse({
        description: 'Input validation failed.',
      }),
      ApiUnauthorizedResponse({ description: 'Unautorized user.' }),
      ApiInternalServerErrorResponse({ description: 'Unexpected errors.' }),
      Put(this.routes.UPDATE_ONE_BY_ID)
    );
  }

  DELETE_ONE_BY_ID() {
    return applyDecorators(
      ApiOperation({ summary: 'Delete one entity by id.' }),
      ApiOkResponse({ description: 'Success' }),
      ApiNotFoundResponse({ description: 'Entity not found' }),
      ApiUnauthorizedResponse({ description: 'Unautorized user.' }),
      ApiInternalServerErrorResponse({ description: 'Unexpected errors.' }),
      Delete(this.routes.DELETE_ONE_BY_ID)
    );
  }

  GENERIC_ADD_RELATION() {
    return applyDecorators(
      ApiOperation({
        summary:
          'Add many-to-many relation by entity id, relation name, and relation id.',
      }),
      ApiOkResponse({ description: 'Success' }),
      ApiNotFoundResponse({ description: 'Entity or relation not found.' }),
      ApiUnauthorizedResponse({ description: 'Unautorized user.' }),
      ApiInternalServerErrorResponse({ description: 'Unexpected errors.' }),
      Put(this.routes.GENERIC_ADD_RELATION)
    );
  }

  GENERIC_REMOVE_RELATION() {
    return applyDecorators(
      ApiOperation({
        summary:
          'Remove many-to-many relation by entity id, relation name, and relation id.',
      }),
      ApiOkResponse({ description: 'Success' }),
      ApiNotFoundResponse({ description: 'Entity or relation not found.' }),
      ApiUnauthorizedResponse({ description: 'Unautorized user.' }),
      ApiInternalServerErrorResponse({ description: 'Unexpected errors.' }),
      Delete(this.routes.GENERIC_REMOVE_RELATION)
    );
  }

  GENERIC_SET_RELATION() {
    return applyDecorators(
      ApiOperation({
        summary:
          'Set many-to-one or one-to-one relation by entity id, relation name, and relation id.',
      }),
      ApiOkResponse({ description: 'Success' }),
      ApiNotFoundResponse({ description: 'Entity or relation not found.' }),
      ApiUnauthorizedResponse({ description: 'Unautorized user.' }),
      ApiInternalServerErrorResponse({ description: 'Unexpected errors.' }),
      Post(this.routes.GENERIC_SET_RELATION)
    );
  }

  GENERIC_UNSET_RELATION() {
    return applyDecorators(
      ApiOperation({
        summary:
          'Unset many-to-one or one-to-one relation by entity id, and relation name.',
      }),
      ApiOkResponse({ description: 'Success' }),
      ApiNotFoundResponse({ description: 'Entity not found.' }),
      ApiUnauthorizedResponse({ description: 'Unautorized user.' }),
      ApiInternalServerErrorResponse({ description: 'Unexpected errors.' }),
      Delete(this.routes.GENERIC_UNSET_RELATION)
    );
  }

  ADD_RELATION(relationRoute: RouteBuilder) {
    return applyDecorators(
      ApiOperation({
        summary: `Add ${relationRoute.singularName} relation by entity id, relation name, and relation id.`,
      }),
      ApiOkResponse({ description: 'Success' }),
      ApiNotFoundResponse({ description: 'Entity or relation not found.' }),
      ApiUnauthorizedResponse({ description: 'Unautorized user.' }),
      ApiInternalServerErrorResponse({ description: 'Unexpected errors.' }),
      Put(this.routes.ADD_RELATION(relationRoute))
    );
  }

  REMOVE_RELATION(relationRoute: RouteBuilder) {
    return applyDecorators(
      ApiOperation({
        summary: `Remove ${relationRoute.singularName} relation by entity id, relation name, and relation id.`,
      }),
      ApiOkResponse({ description: 'Success' }),
      ApiNotFoundResponse({ description: 'Entity or relation not found.' }),
      ApiUnauthorizedResponse({ description: 'Unautorized user.' }),
      ApiInternalServerErrorResponse({ description: 'Unexpected errors.' }),
      Delete(this.routes.REMOVE_RELATION(relationRoute))
    );
  }

  SET_RELATION(relationRoute: RouteBuilder) {
    return applyDecorators(
      ApiOperation({
        summary: `Set ${relationRoute.singularName} relation by entity id, relation name, and relation id.`,
      }),
      ApiOkResponse({ description: 'Success' }),
      ApiNotFoundResponse({ description: 'Entity or relation not found.' }),
      ApiUnauthorizedResponse({ description: 'Unautorized user.' }),
      ApiInternalServerErrorResponse({ description: 'Unexpected errors.' }),
      Post(this.routes.SET_RELATION(relationRoute))
    );
  }

  UNSET_RELATION(relationRoute: RouteBuilder) {
    return applyDecorators(
      ApiOperation({
        summary: `Unset ${relationRoute.singularName} relation by entity id, and relation name.`,
      }),
      ApiOkResponse({ description: 'Success' }),
      ApiNotFoundResponse({ description: 'Entity not found.' }),
      ApiUnauthorizedResponse({ description: 'Unautorized user.' }),
      ApiInternalServerErrorResponse({ description: 'Unexpected errors.' }),
      Delete(this.routes.UNSET_RELATION(relationRoute))
    );
  }

  COUNT() {
    return applyDecorators(
      ApiOperation({ summary: 'Count entities by query' }),
      ApiQuery({ type: PickType(this.options.queryDto, ['where']) }),
      ApiOkResponse({ description: 'Success' }),
      ApiUnauthorizedResponse({ description: 'Unautorized user.' }),
      ApiInternalServerErrorResponse({ description: 'Unexpected errors.' }),
      Get(this.routes.COUNT)
    );
  }
}
