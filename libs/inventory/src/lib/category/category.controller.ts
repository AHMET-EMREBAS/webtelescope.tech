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
import { SetPermission } from '@webpackages/auth';
import { ValidationPipe, QueryDto } from '@webpackages/core';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { CategoryService } from './category.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@ApiTags('CategoryController')
@Controller()
export class CategoryController {
  constructor(protected readonly categoryService: CategoryService) {}

  @SetPermission('category:read')
  @Get('categorys')
  async findAllCategorys(@Query(ValidationPipe) query: QueryDto) {
    return this.categoryService.find(query);
  }

  @SetPermission('category:read')
  @Get('category/:id')
  findCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOneById(id);
  }
  @SetPermission('category:read')
  @Post('category')
  async save(@Body(ValidationPipe) entity: CreateCategoryDto) {
    return this.categoryService.save(entity);
  }

  @SetPermission('category:update')
  @Put('category/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateCategoryDto
  ) {
    return this.categoryService.update(id, entity);
  }

  @SetPermission('category:delete')
  @Delete('category/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
