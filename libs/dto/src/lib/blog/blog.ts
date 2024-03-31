import { ICreateBlogDto, IID } from '@webpackages/model';
import { Dto, NameProperty, ObjectIdProperty } from '@webpackages/property';

@Dto()
export class CreateBlogDto implements ICreateBlogDto {
  @NameProperty() title!: string;
  @ObjectIdProperty() blog!: IID;
}
