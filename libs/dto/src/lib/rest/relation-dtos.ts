import {
  Dto,
  NameProperty,
  ObjectIDDto,
  PositiveNumberProperty,
} from '@webpackages/property';

@Dto()
export class SetRelationDto extends ObjectIDDto {
  @NameProperty() relationName!: string;
  @PositiveNumberProperty() relationId!: number;
}

@Dto()
export class AddRelationDto extends ObjectIDDto {
  @NameProperty() relationName!: string;
  @PositiveNumberProperty() relationId!: number;
}

@Dto()
export class RemoveRelationDto extends ObjectIDDto {
  @NameProperty() relationName!: string;
  @PositiveNumberProperty() relationId!: number;
}

@Dto()
export class UnsetRelationDto extends ObjectIDDto {
  @NameProperty() relationName!: string;
}
