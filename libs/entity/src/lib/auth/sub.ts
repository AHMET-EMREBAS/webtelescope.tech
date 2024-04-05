import { ISub } from '@webpackages/model';
import {
  OneRelation,
  PasswordColumn,
  StringColumn,
  TimestampEntity,
} from '@webpackages/typeorm';
import { SubType } from './sub-type';
import { Entity } from 'typeorm';

/**
 * Subscription
 */
@Entity()
export class Sub extends TimestampEntity implements ISub<SubType> {
  @StringColumn() username!: string;
  @PasswordColumn() password!: string;
  @OneRelation(SubType) subscription!: SubType;
}
