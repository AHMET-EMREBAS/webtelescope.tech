import { ISub } from '@webpackages/model';
import {
  OneRelation,
  PasswordColumn,
  StringColumn,
  TimestampEntity,
  UniqueNameColumn,
} from '@webpackages/typeorm';
import { SubType } from './sub-type';
import { Entity } from 'typeorm';

/**
 * Subscription
 */
@Entity()
export class Sub extends TimestampEntity implements ISub<SubType> {
  @UniqueNameColumn() username!: string;
  @PasswordColumn() password!: string;
  @StringColumn({ unique: true }) orgname!: string;
  @OneRelation(SubType) subtype!: SubType;
}
