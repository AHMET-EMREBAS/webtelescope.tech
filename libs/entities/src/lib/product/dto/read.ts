import {
  Dto,
  TextProperty,
  NumberProperty,
  DateProperty,
} from '@webpackages/core';

@Dto()
export class ReadProductDto {
  @NumberProperty() id!: string;
  @TextProperty() name!: string;
  @DateProperty() createdAt!: Date;
  @DateProperty() updatedAt!: Date;
  @DateProperty() deletedAt!: Date;
}
