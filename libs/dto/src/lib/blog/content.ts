import { ICreateContentDto, IID } from '@webpackages/model';
import { Dto, ObjectIdProperty, StringProperty } from '@webpackages/property';

@Dto()
export class CreateContentDto implements ICreateContentDto {
  @StringProperty() content!: string;
  @ObjectIdProperty() article!: IID;
}
