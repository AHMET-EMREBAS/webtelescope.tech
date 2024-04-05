import { ICreateUserDto } from '@webpackages/model';
import {
  Dto,
  EmailProperty,
  ObjectIDDto,
  ObjectProperty,
} from '@webpackages/property';

@Dto()
export class CreateUserDto implements ICreateUserDto<ObjectIDDto, ObjectIDDto> {
  @EmailProperty() username!: string;
  @ObjectProperty({ objectType: ObjectIDDto }) roles!: ObjectIDDto[];
}
