import { IOrganization } from '@webpackages/model';
import { NameColumn, TimestampEntity } from '../common';
import { Entity } from 'typeorm';

@Entity()
export class Organization extends TimestampEntity implements IOrganization {
  @NameColumn() organizationName!: string;
}
