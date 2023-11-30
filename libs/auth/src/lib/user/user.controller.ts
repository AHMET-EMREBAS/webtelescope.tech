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
import { CreateUserDto, QueryUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { SetPermission } from '../meta';
import { ValidationPipe } from '@webpackages/core';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@ApiTags('UserController')
@Controller()
export class UserController {
  constructor(protected readonly userService: UserService) {}

  @SetPermission('user:read')
  @Get('users')
  async findAllUsers(@Query(ValidationPipe) query: QueryUserDto) {
    return this.userService.find(query);
  }

  @SetPermission('user:read')
  @Get('user/:id')
  findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }
  @SetPermission('user:read')
  @Post('user')
  async save(@Body(ValidationPipe) entity: CreateUserDto) {
    return this.userService.save(entity);
  }

  @SetPermission('user:update')
  @Put('user/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateUserDto
  ) {
    return this.userService.update(id, entity);
  }

  @SetPermission('user:delete')
  @Delete('user/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
