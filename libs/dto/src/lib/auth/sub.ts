import { ICreateSubDto } from '@webpackages/model';
import {
  Dto,
  EmailProperty,
  NameProperty,
  ObjectIDDto,
  ObjectIdProperty,
  PasswordProperty,
} from '@webpackages/property';
import { Transform } from 'class-transformer';
import { IsNotIn } from 'class-validator';

@Dto()
export class CreateSubDto implements ICreateSubDto<ObjectIDDto> {
  @IsNotIn([
    'root@webtelescope.tech',
    'main@webtelescope.tech',
    'admin@webtelescope.tech',
  ])
  @EmailProperty()
  username!: string;

  @PasswordProperty()
  password!: string;

  @IsNotIn(['main'])
  @NameProperty()
  @Transform(({ value }) => (value as string)?.toLowerCase())
  organizationName!: string;

  @ObjectIdProperty({ required: false }) subType!: ObjectIDDto;
}
