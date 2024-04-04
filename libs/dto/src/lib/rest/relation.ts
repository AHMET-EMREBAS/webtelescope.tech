import { OmitType } from '@nestjs/swagger';
import {
  Dto,
  NameProperty,
  PositiveNumberProperty,
} from '@webpackages/property';

@Dto()
export class SetRelationDto {
  @PositiveNumberProperty() id!: number;
  @NameProperty() relationName!: string;
  @PositiveNumberProperty() relationId!: number;
}

@Dto()
export class AddRelationDto extends SetRelationDto {}

@Dto()
export class RemoveRelationDto extends SetRelationDto {}

@Dto()
export class UnsetRelationDto extends OmitType(SetRelationDto, [
  'relationId',
]) {}
