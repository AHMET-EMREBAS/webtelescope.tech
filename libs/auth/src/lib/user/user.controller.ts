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
import { CreateUserDto, QueryUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class UserController {
  constructor(protected readonly userService: UserService) {}

  @Permissions('user:read')
  @Get('users')
  async findAllUsers(@Query(ValidationPipe) query: QueryUserDto) {
    return this.userService.find(query);
  }

  @Permissions('user:read')
  @Get('user/:id')
  findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }
  @Permissions('user:read')
  @Post('user')
  async save(@Body(ValidationPipe) entity: CreateUserDto) {
    return this.userService.save(entity);
  }

  @Permissions('user:update')
  @Put('user/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateUserDto
  ) {
    return this.userService.update(id, entity);
  }

  @Permissions('user:delete')
  @Delete('user/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
