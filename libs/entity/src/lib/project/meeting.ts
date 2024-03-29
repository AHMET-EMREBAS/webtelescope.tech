import { IMeeting } from '@webpackages/model';
import {
  BooleanColumn,
  DateColumn,
  ManyRelation,
  NameColumn,
  NumberColumn,
  ObjectColumn,
  OneRelation,
  TextColumn,
  TimestampEntity,
} from '../common';
import { Entity } from 'typeorm';
import { User } from '../auth';
import { Sprint } from './sprint';

@Entity()
export class Meeting extends TimestampEntity implements IMeeting<User, Sprint> {
  @NameColumn() title!: string;
  @TextColumn() description!: string;
  @DateColumn() start!: Date;
  @NumberColumn() duration!: number;
  @ObjectColumn() goals!: string[];
  @ManyRelation(User) invitedMembers!: User[];
  @ManyRelation(User) attendantMembers!: User[];
  @BooleanColumn() held!: boolean;
  @OneRelation(Meeting) delayedTo!: IMeeting<User, Sprint>;
  @OneRelation(Sprint) sprint!: Sprint;
}
