import { ISubType } from '@webpackages/model';
import { StringColumn, TimestampEntity, Entity } from '@webpackages/typeorm';

@Entity()
export class SubType extends TimestampEntity implements ISubType {
  @StringColumn({ unique: true }) subtype!: string;
}
