import { IOAuth } from '@webpackages/model';
import {
  Entity,
  ManyRelation,
  OwnerRelation,
  StringColumn,
  TimestampEntity,
  UniqueNameColumn,
} from '@webpackages/typeorm';
import { Scope } from './scope';
import { App } from './app';

@Entity()
export class OAuth extends TimestampEntity implements IOAuth<App, Scope> {
  @UniqueNameColumn() name!: string;
  @StringColumn({ unique: true }) apiKey!: string;
  @OwnerRelation(App) app!: App;
  @ManyRelation(Scope) scopes!: Scope[];
}
