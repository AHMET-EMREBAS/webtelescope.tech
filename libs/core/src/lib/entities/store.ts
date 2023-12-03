import { Entity } from 'typeorm';
import {
  BaseEntity,
  BaseIDEntity,
  BaseNameDescriptionEntity,
  BaseNameEntity,
  BaseNameDto,
  BaseNameAndDescriptionDto,
} from './__base-entities';
import {
  NumberColumn,
  OwnerRelation,
  OneRelation,
  ObjectIdProperty,
  ObjectId,
  PositiveNumberProperty,
  PositiveIntegerProperty,
  ManyRelation,
  UniqueTextColumn,
  TextProperty,
  TextColumn,
  URLProperty,
} from '../properties';
import { Exclude } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

/**
 * Product Category
 *
 *
 *
 *
 */
@Entity()
export class Category extends BaseNameEntity {}

@Exclude()
export class CreateCategoryDto extends BaseNameDto {}

@Exclude()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

/**
 * Product Department
 *
 *
 *
 *
 */
@Entity()
export class Department extends BaseNameEntity {}

@Exclude()
export class CreateDepartmentDto extends BaseNameDto {}

@Exclude()
export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {}

/**
 * Price Level
 *
 *
 *
 *
 */
@Entity()
export class PriceLevel extends BaseNameEntity {}

@Exclude()
export class CreatePriceLevelDto extends BaseNameDto {}

@Exclude()
export class UpdatePriceLevelDto extends PartialType(CreatePriceLevelDto) {}

/**
 * Store
 *
 *
 *
 *
 */
@Entity()
export class Store<
  TPriceLevel extends BaseIDEntity = PriceLevel
> extends BaseNameEntity {
  @OneRelation({ target: PriceLevel }) priceLevel!: TPriceLevel;
}

@Exclude()
export class CreateStoreDto extends BaseNameDto implements Store<ObjectId> {
  @ObjectIdProperty({ required: true }) priceLevel!: ObjectId;
}

@Exclude()
export class UpdateStoreDto extends PartialType(CreateStoreDto) {}

/**
 * Product
 *
 *
 *
 *
 */
@Entity()
export class Product<
  TCategory extends BaseIDEntity = Category
> extends BaseNameDescriptionEntity {
  @ManyRelation({ target: Category }) categories!: TCategory[];
}

@Exclude()
export class CreateProductDto
  extends BaseNameAndDescriptionDto
  implements Product<ObjectId>
{
  @ObjectIdProperty({ isArray: true }) categories!: ObjectId[];
}

@Exclude()
export class UpdateProductDto extends PartialType(CreateProductDto) {}

/**
 * Sku
 *
 *
 *
 *
 */
@Entity()
export class Sku<
  TProduct extends BaseIDEntity = Product
> extends BaseNameDescriptionEntity {
  @UniqueTextColumn() barcode!: string;

  @OwnerRelation({ target: Product }) product!: TProduct;
}

@Exclude()
export class CreateSkuDto
  extends BaseNameAndDescriptionDto
  implements Sku<ObjectId>
{
  @TextProperty({ required: true }) barcode!: string;
  @ObjectIdProperty({ required: true }) product!: ObjectId;
}

@Exclude()
export class UpdateSkuDto extends PartialType(CreateSkuDto) {}

/**
 * Price
 *
 *
 *
 *
 */
@Entity()
export class Price<
  TPriceLevel extends BaseIDEntity = PriceLevel
> extends BaseEntity {
  @NumberColumn() price!: number;
  @NumberColumn() const!: number;
  @OwnerRelation({ target: Sku }) sku!: Sku;
  @OwnerRelation({ target: PriceLevel }) priceLevel!: TPriceLevel;
}

@Exclude()
export class CreatePriceDto implements Price<ObjectId> {
  @PositiveNumberProperty({ required: true }) price!: number;
  @PositiveNumberProperty({ required: true }) const!: number;
  @ObjectIdProperty({ required: true }) sku!: Sku<Product>;
  @ObjectIdProperty({ required: true }) priceLevel!: ObjectId;
}

@Exclude()
export class UpdatePriceDto extends PartialType(CreatePriceDto) {}

/**
 * Quantity
 *
 *
 *
 *
 *
 */
@Entity()
export class Quantity<
  TSku extends BaseIDEntity = Sku,
  TStore extends BaseIDEntity = Store
> extends BaseEntity {
  @NumberColumn() quantity!: number;
  @OwnerRelation({ target: Sku }) sku!: TSku;
  @OwnerRelation({ target: Store }) store!: TStore;
}

@Exclude()
export class CreateQuantityDto implements Quantity<ObjectId, ObjectId> {
  @PositiveIntegerProperty({ required: true }) quantity!: number;
  @ObjectIdProperty({ required: true }) sku!: ObjectId;
  @ObjectIdProperty({ required: true }) store!: ObjectId;
}

@Exclude()
export class UpdateQuantityDto extends PartialType(CreateQuantityDto) {}

/**
 * User image
 *
 *
 *
 *
 */
@Entity()
export class ProductImage<
  TProduct extends BaseIDEntity = Product
> extends BaseEntity {
  @TextColumn()
  url!: string;

  @OwnerRelation({ target: Product })
  product!: TProduct;
}

@Exclude()
export class CreateProductImageDto implements ProductImage<ObjectId> {
  @URLProperty({ required: true }) url!: string;
  @ObjectIdProperty({ required: true }) product!: ObjectId;
}

@Exclude()
export class UpdateProductImageDto extends PartialType(CreateProductImageDto) {}
