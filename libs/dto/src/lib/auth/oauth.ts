import { PartialType } from '@nestjs/swagger';
import { ICreateOAuthDto, IID } from '@webpackages/model';
import { Dto, NameProperty, ObjectIdProperty } from '@webpackages/property';

@Dto()
export class CreateOAuthDto implements ICreateOAuthDto {
  @NameProperty() name!: string;
  @ObjectIdProperty() app!: IID;
  @ObjectIdProperty({ required: false }) scopes!: IID[];
}

@Dto()
export class UpdateOAuthDto extends PartialType(CreateOAuthDto) {}
