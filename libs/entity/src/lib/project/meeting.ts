import { IMeeting } from '@webpackages/model';
import {
  BooleanColumn,
  DateColumn,
  ManyRelation,
  StringColumn,
  NumberColumn,
  ObjectColumn,
  OneRelation,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';

import { User } from '../auth';
import { Sprint } from './sprint';

@Entity()
export class Meeting extends TimestampEntity implements IMeeting<User, Sprint> {
  @StringColumn() title!: string;
  @StringColumn({ required: false }) description!: string;
  @DateColumn() start!: Date;
  @NumberColumn() duration!: number;
  @ObjectColumn() goals!: string[];
  @ManyRelation(User) invitedMembers!: User[];
  @ManyRelation(User) attendantMembers!: User[];
  @BooleanColumn({ required: false }) held!: boolean;
  @OneRelation(Meeting) delayedTo!: IMeeting<User, Sprint>;
  @OneRelation(Sprint) sprint!: Sprint;
}
