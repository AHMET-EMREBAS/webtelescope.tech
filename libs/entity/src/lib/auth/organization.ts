import { IOrganization } from '@webpackages/model';
import { NameColumn, TimestampEntity, Entity } from '@webpackages/typeorm';

@Entity()
export class Organization extends TimestampEntity implements IOrganization {
  @NameColumn() organizationName!: string;
}
