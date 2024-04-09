import { IOAuth } from '@webpackages/model';
import { Organization } from './organization';
import {
  Entity,
  OwnerRelation,
  StringColumn,
  TimestampEntity,
  UniqueNameColumn,
} from '@webpackages/typeorm';

@Entity()
export class OAuth extends TimestampEntity implements IOAuth<Organization> {
  @UniqueNameColumn() name!: string;
  @StringColumn() apiKey!: string;
  @OwnerRelation(Organization) organization!: Organization;
  @StringColumn() scope!: string;
}
