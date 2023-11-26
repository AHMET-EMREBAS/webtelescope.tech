import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AUTH_TOKEN_NAME } from '@webpackages/common';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@webpackages/models';
import { RestController } from '@webpackages/rest';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class CategoryController extends RestController({
  entity: Category,
  view: Category,
  createDto: CreateCategoryDto,
  updateDto: UpdateCategoryDto,
  pluralPath: 'categories',
  singularPath: 'category',
}) {}
