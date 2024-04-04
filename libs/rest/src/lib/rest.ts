import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Type,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { ApiPaths, NameResult, getApiPaths, names } from '@webpackages/utils';
import { CanRead, CanUpdate, CanWrite } from '@webpackages/auth';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from '@webpackages/dto';

export function __commonApiResponses() {
  return applyDecorators(
    ApiInternalServerErrorResponse({
      description: 'Something went wrong, please try again later!',
    }),
    ApiUnauthorizedResponse({
      description: 'User does not have required permissions!',
    })
  );
}

export function FindAllResponse(entity: Type) {
  return applyDecorators(
    __commonApiResponses(),
    ApiNotFoundResponse({
      description: 'There is no entity matched with the provided query!',
    }),
    ApiOkResponse({
      description: 'Found entities',
      type: entity,
      isArray: true,
    })
  );
}

export function SaveResponse(entity: Type) {
  return applyDecorators(
    __commonApiResponses(),
    ApiUnprocessableEntityResponse({
      description: 'Input validation error',
    }),
    ApiCreatedResponse({
      description: 'Saved entity',
      type: entity,
    })
  );
}

export function FindOneByIdResponse(entity: Type) {
  return applyDecorators(
    __commonApiResponses(),
    ApiNotFoundResponse({
      description: 'There is no entity matched with the provided query!',
    }),
    ApiOkResponse({
      description: 'Found entities',
      type: entity,
    })
  );
}

export function DeleteResponse() {
  return applyDecorators(
    __commonApiResponses(),
    ApiNotFoundResponse({
      description: 'There is no entity matched with the provided query!',
    }),
    ApiOkResponse({
      description: 'Deleted entity',
      type: DeleteResult,
    })
  );
}

export function UpdateResponse() {
  return applyDecorators(
    __commonApiResponses(),
    ApiNotFoundResponse({
      description: 'There is no entity matched with the provided query!',
    }),
    ApiUnprocessableEntityResponse({
      description: 'Input validation error',
    }),
    ApiOkResponse({
      description: 'Updated entity',
      type: UpdateResult,
    })
  );
}

export function AddRelationResponse(entity: Type) {
  return applyDecorators(
    __commonApiResponses(),
    ApiOkResponse({
      description: 'Added relation',
      type: entity,
    })
  );
}

export function RemoveRelationResponse(entity: Type) {
  return applyDecorators(
    __commonApiResponses(),
    ApiOkResponse({
      description: 'Removed relation',
      type: entity,
    })
  );
}

export function SetRelationResponse(entity: Type) {
  return applyDecorators(
    __commonApiResponses(),
    ApiOkResponse({
      description: 'Set relation',
      type: entity,
    })
  );
}

export function UnsetRelationResponse(entity: Type) {
  return applyDecorators(
    __commonApiResponses(),
    ApiOkResponse({
      description: 'Unset relation',
      type: entity,
    })
  );
}

export class RestResource {
  private readonly RESOURCE_NAME!: string;
  private readonly NAMES!: NameResult;
  private readonly API_PATHS!: ApiPaths;

  constructor(private readonly entity: Type) {
    this.RESOURCE_NAME = this.entity.name;
    this.NAMES = names(entity.name);
    this.API_PATHS = getApiPaths(this.NAMES.fileName);
  }

  Controller() {
    return applyDecorators(
      Controller(),
      ApiTags(this.RESOURCE_NAME + 'Controller'),
      UseGuards()
    );
  }

  FindAll() {
    return applyDecorators(
      FindAllResponse(this.entity),
      ApiOperation({ summary: `Find all ${this.RESOURCE_NAME} by query` }),
      CanRead(this.RESOURCE_NAME),
      Get(this.API_PATHS.PLURAL_PATH)
    );
  }

  FindOneById() {
    return applyDecorators(
      FindOneByIdResponse(this.entity),
      ApiOperation({ summary: `Find all ${this.RESOURCE_NAME} by id` }),
      CanRead(this.RESOURCE_NAME),
      Get(this.API_PATHS.BY_ID_PATH)
    );
  }

  Save() {
    return applyDecorators(
      SaveResponse(this.entity),
      ApiOperation({ summary: `Save ${this.RESOURCE_NAME}` }),
      CanWrite(this.RESOURCE_NAME),
      Post(this.API_PATHS.SINGULAR_PATH)
    );
  }

  Update() {
    return applyDecorators(
      UpdateResponse(),
      ApiOperation({ summary: `Update ${this.RESOURCE_NAME}` }),
      CanUpdate(this.RESOURCE_NAME),
      Put(this.API_PATHS.BY_ID_PATH)
    );
  }

  Delete() {
    return applyDecorators(
      DeleteResponse(),
      ApiOperation({ summary: `Delete ${this.RESOURCE_NAME}` }),
      CanUpdate(this.RESOURCE_NAME),
      Delete(this.API_PATHS.BY_ID_PATH)
    );
  }

  AddRelation() {
    return applyDecorators(
      AddRelationResponse(this.entity),
      ApiOperation({ summary: `Add relation to ${this.RESOURCE_NAME}` }),
      CanUpdate(this.RESOURCE_NAME),
      Put(this.API_PATHS.RELATION_NAME_AND_ID_PATH)
    );
  }

  RemoveRelation() {
    return applyDecorators(
      RemoveRelationResponse(this.entity),
      ApiOperation({ summary: `Remove relation from ${this.RESOURCE_NAME}` }),
      CanUpdate(this.RESOURCE_NAME),
      Delete(this.API_PATHS.RELATION_NAME_AND_ID_PATH)
    );
  }

  SetRelation() {
    return applyDecorators(
      SetRelationResponse(this.entity),
      ApiOperation({ summary: `Set relation to ${this.RESOURCE_NAME}` }),
      CanUpdate(this.RESOURCE_NAME),
      Post(this.API_PATHS.RELATION_NAME_AND_ID_PATH)
    );
  }

  UnsetRelation() {
    return applyDecorators(
      UnsetRelationResponse(this.entity),
      ApiOperation({ summary: `Unset relation from ${this.RESOURCE_NAME}` }),
      CanUpdate(this.RESOURCE_NAME),
      Delete(this.API_PATHS.RELATION_NAME_PATH)
    );
  }

  Count() {
    return applyDecorators(
      ApiOperation({ summary: `Count of ${this.RESOURCE_NAME}` }),
      CanRead(this.RESOURCE_NAME),
      Get(this.API_PATHS.COUNT_PATH)
    );
  }
}
