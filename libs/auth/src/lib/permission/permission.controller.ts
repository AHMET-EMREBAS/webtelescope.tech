import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AUTH_TOKEN_NAME } from '@webpackages/common';
import { Permissions } from '@webpackages/auth';
import { ValidationPipe } from '@webpackages/rest';
import {
  CreatePermissionDto,
  QueryPermissionDto,
  UpdatePermissionDto,
} from './dto';
import { PermissionService } from './permission.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class PermissionController {
  constructor(protected readonly permissionService: PermissionService) {}

  @Permissions('permission:read')
  @Get('permissions')
  async findAllPermissions(@Query(ValidationPipe) query: QueryPermissionDto) {
    return this.permissionService.find(query);
  }

  @Permissions('permission:read')
  @Get('permission/:id')
  findPermissionById(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.findOneById(id);
  }
  @Permissions('permission:read')
  @Post('permission')
  async save(@Body(ValidationPipe) entity: CreatePermissionDto) {
    return this.permissionService.save(entity);
  }

  @Permissions('permission:update')
  @Put('permission/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdatePermissionDto
  ) {
    return this.permissionService.update(id, entity);
  }

  @Permissions('permission:delete')
  @Delete('permission/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.delete(id);
  }
}
