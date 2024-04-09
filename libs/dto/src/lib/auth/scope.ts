import { ICreateScopeDto } from '@webpackages/model';
import { Dto, StringProperty } from '@webpackages/property';

@Dto()
export class CreateScopeDto implements ICreateScopeDto {
  @StringProperty() scope!: string;
}

@Dto()
export class UpdateScopeDto extends CreateScopeDto {}
