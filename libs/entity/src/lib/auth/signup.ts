import { ISignup } from '@webpackages/model';
import {
  OneRelation,
  PasswordColumn,
  StringColumn,
  TimestampEntity,
} from '@webpackages/typeorm';
import { Subscription } from './subscription';
import { Entity } from 'typeorm';

@Entity()
export class Signup extends TimestampEntity implements ISignup<Subscription> {
  @StringColumn() username!: string;
  @PasswordColumn() password!: string;
  @OneRelation(Subscription) subscription!: Subscription;
}
