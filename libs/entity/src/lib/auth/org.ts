import { IOrg } from '@webpackages/model';
import { StringColumn, TimestampEntity, Entity } from '@webpackages/typeorm';

@Entity()
export class Org extends TimestampEntity implements IOrg {
  @StringColumn({ unique: true }) orgname!: string;
}
