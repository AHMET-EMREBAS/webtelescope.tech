import {
  Dto,
  TextProperty,
  NumberProperty,
  DateProperty,
} from '@webpackages/core';

@Dto()
export class ReadDto {
  @NumberProperty() id!: string;
  @TextProperty() name!: string;
  @DateProperty() createdAt!: Date;
  @DateProperty() updatedAt!: Date;
  @DateProperty() deletedAt!: Date;
}
