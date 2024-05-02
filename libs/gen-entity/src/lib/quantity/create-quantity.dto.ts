import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateQuantityDto } from '@webpackages/gen-model';
@Dto()
export class CreateQuantityDto implements ICreateQuantityDto {
  /**
   * Quantity of the Product-Sku in the store.
   */ @Property({
    type: 'number',
    required: true,
    description: 'Quantity of the Product-Sku in the store.',
    minimum: 0,
  })
  quanitty!: number;
  @Property({ type: 'object', objectType: IDDto, required: true }) sku!: IDDto;
  @Property({ type: 'object', objectType: IDDto, required: true })
  store!: IDDto;
}
