import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AUTH_TOKEN_NAME } from '@webpackages/common';
import {
  CreateProductDto,
  Product,
  ProductView,
  UpdateProductDto,
} from '@webpackages/models';
import { RestController } from '@webpackages/rest';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class ProductController extends RestController({
  entity: Product,
  view: ProductView,
  createDto: CreateProductDto,
  updateDto: UpdateProductDto,
  singularPath: 'product',
  pluralPath: 'products',
}) {}
