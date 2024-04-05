import { IRootUser } from '@webpackages/model';
import {
  Entity,
  PasswordColumn,
  StringColumn,
  TimestampEntity,
} from '@webpackages/typeorm';

@Entity()
export class RootUser extends TimestampEntity implements IRootUser {
  @StringColumn({ unique: true }) username!: string;
  @PasswordColumn() password!: string;
}
