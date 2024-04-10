import { IOAuth } from '@webpackages/model';
import {
  Entity,
  ManyRelation,
  OneRelation,
  TimestampEntity,
  UUIDColumn,
  UniqueNameColumn,
} from '@webpackages/typeorm';
import { Scope } from './scope';
import { App } from './app';

@Entity()
export class OAuth extends TimestampEntity implements IOAuth<App, Scope> {
  @UniqueNameColumn() name!: string;
  @UUIDColumn() apiKey!: string;
  @OneRelation(App) app!: App;
  @ManyRelation(Scope) scopes!: Scope[];
}
