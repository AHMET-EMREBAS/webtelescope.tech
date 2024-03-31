import { ICreateSocialProfileDto, IID } from '@webpackages/model';
import { Dto, ObjectIdProperty, URLProperty } from '@webpackages/property';

@Dto()
export class CreateSocialProfileDto implements ICreateSocialProfileDto {
  @URLProperty() profileLink!: string;
  @ObjectIdProperty() user!: IID;
}
