import { CreateCategoryDto, UpdateCategoryDto } from '@webpackages/dto';
import { Category } from '@webpackages/entity';
import { CreateController } from '@webpackages/rest';

export class CategoryController extends CreateController({
  entity: Category,
  createDto: CreateCategoryDto,
  updateDto: UpdateCategoryDto,
}) {}
