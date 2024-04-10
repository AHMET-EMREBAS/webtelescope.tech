import { ICreateSessionDto } from '@webpackages/model';
import {
  Dto,
  NameProperty,
  NumberProperty,
  ObjectIdProperty,
  StringProperty,
} from '@webpackages/property';

@Dto()
export class CreateSessionDto implements ICreateSessionDto {
  @NameProperty() deviceId!: string;
  @NameProperty({ isArray: true }) permissions!: string[];
  @NameProperty({ isArray: true }) roles!: string[];
  @ObjectIdProperty() userId!: number;
  @NumberProperty() orgId!: number;
  @StringProperty() orgname!: string;
}
