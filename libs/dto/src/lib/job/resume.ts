import { ICreateResumeDto, IID } from '@webpackages/model';
import { Dto, NameProperty, ObjectIdProperty } from '@webpackages/property';

@Dto()
export class CreateResumeDto implements ICreateResumeDto {
  @NameProperty() resumeName!: string;
  @ObjectIdProperty() user!: IID;
}
