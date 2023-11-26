import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AUTH_TOKEN_NAME } from '@webpackages/common';
import {
  Category,
  CreateCategoryDto,
  CreatePermissionDto,
  CreateQuantityDto,
  CreateStoreDto,
  Permission,
  Quantity,
  Store,
  UpdateCategoryDto,
  UpdatePermissionDto,
  UpdateQuantityDto,
  UpdateStoreDto,
  Price,
  CreatePriceDto,
  UpdatePriceDto,
  CreatePriceLevelDto,
  PriceLevel,
  UpdatePriceLevelDto,
  CreateProductDto,
  UpdateProductDto,
  Product,
  CreateSkuDto,
  Sku,
  UpdateSkuDto,
  CreateUserDto,
  User,
  UpdateUserDto,
  Role,
  CreateRoleDto,
  UpdateRoleDto,
} from '@webpackages/models';
import { RestController } from '@webpackages/rest';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class UserController extends RestController({
  entity: User,
  view: User,
  createDto: CreateUserDto,
  updateDto: UpdateUserDto,
  pluralPath: 'users',
  singularPath: 'user',
}) {}

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class RoleController extends RestController({
  entity: Role,
  view: Role,
  createDto: CreateRoleDto,
  updateDto: UpdateRoleDto,
  pluralPath: 'roles',
  singularPath: 'role',
}) {}

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class ProductController extends RestController({
  entity: Product,
  view: Product,
  createDto: CreateProductDto,
  updateDto: UpdateProductDto,
  pluralPath: 'products',
  singularPath: 'product',
}) {}

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class SkuController extends RestController({
  entity: Sku,
  view: Sku,
  createDto: CreateSkuDto,
  updateDto: UpdateSkuDto,
  pluralPath: 'skus',
  singularPath: 'sku',
}) {}

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

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class StoreController extends RestController({
  entity: Store,
  view: Store,
  createDto: CreateStoreDto,
  updateDto: UpdateStoreDto,
  pluralPath: 'stores',
  singularPath: 'store',
}) {}

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class PermissionController extends RestController({
  entity: Permission,
  view: Permission,
  createDto: CreatePermissionDto,
  updateDto: UpdatePermissionDto,
  pluralPath: 'permissions',
  singularPath: 'permission',
}) {}

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class QuantityController extends RestController({
  entity: Quantity,
  view: Quantity,
  createDto: CreateQuantityDto,
  updateDto: UpdateQuantityDto,
  pluralPath: 'quantities',
  singularPath: 'quantity',
}) {}

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class PriceController extends RestController({
  entity: Price,
  view: Price,
  createDto: CreatePriceDto,
  updateDto: UpdatePriceDto,
  pluralPath: 'prices',
  singularPath: 'price',
}) {}

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class PriceLevelController extends RestController({
  entity: PriceLevel,
  view: PriceLevel,
  createDto: CreatePriceLevelDto,
  updateDto: UpdatePriceLevelDto,
  pluralPath: 'price-levels',
  singularPath: 'price-level',
}) {}
