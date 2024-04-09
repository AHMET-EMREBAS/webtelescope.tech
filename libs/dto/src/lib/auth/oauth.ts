import { ICreateOAuthDto, IID } from '@webpackages/model';
import { Dto, NameProperty, ObjectIdProperty } from '@webpackages/property';

@Dto()
export class CreateOAuthDto implements ICreateOAuthDto {
  @NameProperty() name!: string;
  @ObjectIdProperty() organization!: IID;
  @ObjectIdProperty() scope!: IID;
}

@Dto()
export class UpdateOAuthDto {}
