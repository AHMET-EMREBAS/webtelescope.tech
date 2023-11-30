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
import { ValidationPipe } from '@webpackages/core';
import { CreateRoleDto, QueryRoleDto, UpdateRoleDto } from './dto';
import { RoleService } from './role.service';
import { SetPermission } from '../meta';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@ApiTags('RoleController')
@Controller()
export class RoleController {
  constructor(protected readonly roleService: RoleService) {}

  @SetPermission('role:read')
  @Get('roles')
  async findAllRoles(@Query(ValidationPipe) query: QueryRoleDto) {
    return this.roleService.find(query);
  }

  @SetPermission('role:read')
  @Get('role/:id')
  findRoleById(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOneById(id);
  }
  @SetPermission('role:read')
  @Post('role')
  async save(@Body(ValidationPipe) entity: CreateRoleDto) {
    return this.roleService.save(entity);
  }

  @SetPermission('role:update')
  @Put('role/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateRoleDto
  ) {
    return this.roleService.update(id, entity);
  }

  @SetPermission('role:delete')
  @Delete('role/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.delete(id);
  }
}
