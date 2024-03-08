import { Dto, NumberProperty, TextProperty } from '../property';

@Dto()
export class SetRelationDto {
  @NumberProperty({ required: true }) id!: number;
  @TextProperty({ required: true }) relationName!: string;
  @NumberProperty({ required: true }) relationId!: number;
}

@Dto()
export class UnsetRelationDto {
  @NumberProperty({ required: true }) id!: number;
  @TextProperty({ required: true }) relationName!: string;
}

@Dto()
export class AddRelationDto extends SetRelationDto {}

@Dto()
export class RemoveRelationDto extends AddRelationDto {}
