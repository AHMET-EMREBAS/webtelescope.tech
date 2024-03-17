import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  applyDecorators,
  Delete,
  Get,
  Controller as NestController,
  Post,
  Put,
} from '@nestjs/common';
import { Policy } from '../auth';

export class ResourceController {
  protected readonly Auth = new Policy(this.singularName);

  constructor(
    private readonly singularName: string,
    private readonly pluralName: string
  ) {}

  Controller() {
    return applyDecorators(
      ApiTags(this.singularName),
      NestController(),
      ApiBearerAuth(Policy.ACCESS_TOKEN_NAME)
    );
  }

  Create() {
    return applyDecorators(
      ApiOperation({ summary: `Create ${this.singularName}` }),
      this.Auth.Create(),
      Post(this.singularName)
    );
  }

  Query() {
    return applyDecorators(
      ApiOperation({ summary: `Query ${this.pluralName}` }),
      this.Auth.Query(),
      Get(this.pluralName)
    );
  }

  FindById() {
    return applyDecorators(
      ApiOperation({ summary: `Find ${this.singularName}` }),
      this.Auth.Query(),
      Get(this.singularName + '/:id')
    );
  }

  Update() {
    return applyDecorators(
      ApiOperation({ summary: `Update ${this.singularName}` }),
      this.Auth.Update(),
      Put(this.singularName + '/:id')
    );
  }

  Delete() {
    return applyDecorators(
      ApiOperation({ summary: `Delete ${this.singularName}` }),
      this.Auth.Update(),
      Delete(this.singularName + '/:id')
    );
  }
}
