import { ICreateBlogDto } from '@webpackages/model';
import {
  Dto,
  NameProperty,
  ObjectIDDto,
  ObjectIdProperty,
} from '@webpackages/property';

@Dto()
export class CreateBlogDto implements ICreateBlogDto {
  @NameProperty() title!: string;
  @ObjectIdProperty() blog!: ObjectIDDto;
}
