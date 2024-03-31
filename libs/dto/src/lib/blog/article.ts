import { ICreateArticleDto, IID } from '@webpackages/model';
import { Dto, NameProperty, ObjectIdProperty } from '@webpackages/property';

@Dto()
export class CreateArticleDto implements ICreateArticleDto {
  @NameProperty() title!: string;
  @ObjectIdProperty() blog!: IID;
}
