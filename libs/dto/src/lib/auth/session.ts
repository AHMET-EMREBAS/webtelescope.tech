import { ICreateSessionDto } from '@webpackages/model';
import {
  Dto,
  ObjectIdDto,
  ObjectIdProperty,
  ShortTextProperty,
} from '@webpackages/property';

@Dto()
export class CreateSessionDto implements ICreateSessionDto {
  @ShortTextProperty() deviceId!: string;
  @ShortTextProperty({ isArray: true }) permissions!: string[];
  @ObjectIdProperty() user!: ObjectIdDto;
}
