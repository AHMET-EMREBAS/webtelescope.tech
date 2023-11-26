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
import { CreateRoleDto, QueryRoleDto, UpdateRoleDto } from './dto';
import { RoleService } from './role.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class RoleController {
  constructor(protected readonly roleService: RoleService) {}

  @Permissions('role:read')
  @Get('roles')
  async findAllRoles(@Query(ValidationPipe) query: QueryRoleDto) {
    return this.roleService.find(query);
  }

  @Permissions('role:read')
  @Get('role/:id')
  findRoleById(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOneById(id);
  }
  @Permissions('role:read')
  @Post('role')
  async save(@Body(ValidationPipe) entity: CreateRoleDto) {
    return this.roleService.save(entity);
  }

  @Permissions('role:update')
  @Put('role/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateRoleDto
  ) {
    return this.roleService.update(id, entity);
  }

  @Permissions('role:delete')
  @Delete('role/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.delete(id);
  }
}
