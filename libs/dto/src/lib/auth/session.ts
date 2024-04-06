import { ICreateSessionDto } from '@webpackages/model';
import { Dto, NameProperty, ObjectIdProperty } from '@webpackages/property';

@Dto()
export class CreateSessionDto implements ICreateSessionDto {
  @NameProperty() deviceId!: string;
  @NameProperty({ isArray: true }) permissions!: string[];
  @NameProperty({ isArray: true }) roles!: string[];
  @ObjectIdProperty() userId!: number;
}
