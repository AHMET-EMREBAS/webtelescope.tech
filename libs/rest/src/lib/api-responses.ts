import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CountResult, DeleteResult, UpdateResult } from '@webpackages/dto';

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

export function CountResponse() {
  return applyDecorators(
    __commonApiResponses(),
    ApiOkResponse({
      description: 'Quantity of entities',
      type: CountResult,
    })
  );
}
