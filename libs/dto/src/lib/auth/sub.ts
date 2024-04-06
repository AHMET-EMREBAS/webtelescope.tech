import { ICreateSubDto } from '@webpackages/model';
import {
  Dto,
  EmailProperty,
  NameProperty,
  ObjectIDDto,
  ObjectIdProperty,
  PasswordProperty,
} from '@webpackages/property';

@Dto()
export class CreateSubDto implements ICreateSubDto<ObjectIDDto> {
  @EmailProperty() username!: string;
  @PasswordProperty() password!: string;
  @NameProperty() organizationName!: string;
  @ObjectIdProperty() subType!: ObjectIDDto;
}
