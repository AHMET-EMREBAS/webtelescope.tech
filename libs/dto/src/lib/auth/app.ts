import { ICreateAppDto } from '@webpackages/model';
import { Dto, StringProperty } from '@webpackages/property';

@Dto()
export class CreateAppDto implements ICreateAppDto {
  @StringProperty() appName!: string;
}

@Dto()
export class UpdateAppDto extends CreateAppDto {}
