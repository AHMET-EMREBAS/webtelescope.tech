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
import { CreateCategoryDto, QueryCategoryDto, UpdateCategoryDto } from './dto';
import { CategoryService } from './category.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class CategoryController {
  constructor(protected readonly categoryService: CategoryService) {}

  @Permissions('category:read')
  @Get('categorys')
  async findAllCategorys(@Query(ValidationPipe) query: QueryCategoryDto) {
    return this.categoryService.find(query);
  }

  @Permissions('category:read')
  @Get('category/:id')
  findCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOneById(id);
  }
  @Permissions('category:read')
  @Post('category')
  async save(@Body(ValidationPipe) entity: CreateCategoryDto) {
    return this.categoryService.save(entity);
  }

  @Permissions('category:update')
  @Put('category/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateCategoryDto
  ) {
    return this.categoryService.update(id, entity);
  }

  @Permissions('category:delete')
  @Delete('category/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
