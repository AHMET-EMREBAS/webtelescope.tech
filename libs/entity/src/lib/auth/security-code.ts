import { ISecurityCode } from '@webpackages/model';
import {
  NumberColumn,
  StringColumn,
  TimestampEntity,
} from '@webpackages/typeorm';
import { Entity } from 'typeorm';

@Entity()
export class SecurityCode extends TimestampEntity implements ISecurityCode {
  @StringColumn({ unique: true }) securityCode!: string;
  @NumberColumn() userId!: number;
}
