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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTH_TOKEN_NAME } from '@webpackages/common';
import { ValidationPipe } from '@webpackages/rest';
import {
  CreatePermissionDto,
  QueryPermissionDto,
  UpdatePermissionDto,
} from './dto';
import { PermissionService } from './permission.service';
import { SetPermission } from '../meta';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@ApiTags('PermissionController')
@Controller()
export class PermissionController {
  constructor(protected readonly permissionService: PermissionService) {}

  @SetPermission('permission:read')
  @Get('permissions')
  async findAllPermissions(@Query(ValidationPipe) query: QueryPermissionDto) {
    return this.permissionService.find(query);
  }

  @SetPermission('permission:read')
  @Get('permission/:id')
  findPermissionById(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.findOneById(id);
  }
  @SetPermission('permission:read')
  @Post('permission')
  async save(@Body(ValidationPipe) entity: CreatePermissionDto) {
    return this.permissionService.save(entity);
  }

  @SetPermission('permission:update')
  @Put('permission/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdatePermissionDto
  ) {
    return this.permissionService.update(id, entity);
  }

  @SetPermission('permission:delete')
  @Delete('permission/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.delete(id);
  }
}
