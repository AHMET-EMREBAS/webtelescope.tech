import { ISession } from '@webpackages/model';
import {
  TimestampEntity,
  Entity,
  StringColumn,
  NumberColumn,
} from '@webpackages/typeorm';

@Entity()
export class Session extends TimestampEntity implements ISession {
  @StringColumn() deviceId!: string;
  @StringColumn({ isArray: true }) permissions!: string[];
  @StringColumn({ isArray: true }) roles!: string[];
  @NumberColumn() orgId!: number;
  @StringColumn() orgname!: string;
  @NumberColumn() userId!: number;
}
