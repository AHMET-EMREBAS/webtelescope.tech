import { IOrganization } from '@webpackages/model';
import { StringColumn, TimestampEntity, Entity } from '@webpackages/typeorm';

@Entity()
export class Organization extends TimestampEntity implements IOrganization {
  @StringColumn() organizationName!: string;
}
