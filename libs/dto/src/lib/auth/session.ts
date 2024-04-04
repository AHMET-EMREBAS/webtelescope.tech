import { ICreateSessionDto } from '@webpackages/model';
import {
  Dto,
  NameProperty,
  ObjectIDDto,
  ObjectIdProperty,
} from '@webpackages/property';

@Dto()
export class CreateSessionDto implements ICreateSessionDto {
  @NameProperty() deviceId!: string;
  @NameProperty({ isArray: true }) permissions!: string[];
  @ObjectIdProperty() user!: ObjectIDDto;
}
