import { ICreateUserDto } from '@webpackages/model';
import {
  Dto,
  EmailProperty,
  ObjectIDDto,
  ObjectProperty,
  PasswordProperty,
} from '@webpackages/property';

@Dto()
export class CreateUserDto implements ICreateUserDto<ObjectIDDto, ObjectIDDto> {
  @EmailProperty() username!: string;
  @PasswordProperty() password!: string;
  @ObjectProperty({
    objectType: ObjectIDDto,
    isArray: true,
    required: false,
    description: 'List of role object-id',
  })
  roles!: ObjectIDDto[];
  @ObjectProperty({
    objectType: ObjectIDDto,
    description: 'Organization object id',
  })
  organization!: ObjectIDDto;
}
