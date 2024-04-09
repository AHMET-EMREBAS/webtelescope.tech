import { IOAuth } from '@webpackages/model';
import { Organization } from './organization';
import {
  Entity,
  ManyRelation,
  OwnerRelation,
  StringColumn,
  TimestampEntity,
  UniqueNameColumn,
} from '@webpackages/typeorm';
import { Scope } from './scope';

@Entity()
export class OAuth
  extends TimestampEntity
  implements IOAuth<Organization, Scope>
{
  @UniqueNameColumn() name!: string;
  @StringColumn() apiKey!: string;
  @OwnerRelation(Organization) organization!: Organization;
  @ManyRelation(Scope) scope!: Scope;
}
