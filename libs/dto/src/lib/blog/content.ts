import { ICreateContentDto, IID } from '@webpackages/model';
import { Dto, LongTextProperty, ObjectIdProperty } from '@webpackages/property';

@Dto()
export class CreateContentDto implements ICreateContentDto {
  @LongTextProperty() content!: string;
  @ObjectIdProperty() article!: IID;
}
