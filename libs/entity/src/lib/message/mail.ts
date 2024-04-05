import { IMail } from '@webpackages/model';
import {
  BooleanColumn,
  Entity,
  StringColumn,
  TimestampEntity,
} from '@webpackages/typeorm';

@Entity()
export class Mail extends TimestampEntity implements IMail {
  @StringColumn() to!: string;
  @StringColumn() from!: string;
  @StringColumn() subject!: string;
  @StringColumn() message!: string;
  @BooleanColumn({ defaultValue: false, required: false }) sent!: boolean;
}
