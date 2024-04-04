import { ISecurityCode } from '@webpackages/model';
import {
  NumberColumn,
  TimestampEntity,
  UUIDColumn,
} from '@webpackages/typeorm';
import { Entity } from 'typeorm';

@Entity()
export class SecurityCode extends TimestampEntity implements ISecurityCode {
  @UUIDColumn() securityCode!: string;
  @NumberColumn() userId!: number;
}
