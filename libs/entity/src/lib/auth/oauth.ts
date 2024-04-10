import { IOAuth } from '@webpackages/model';
import {
  Entity,
  ManyRelation,
  OAuthApiTokenColumn,
  OwnerRelation,
  TimestampEntity,
  UniqueNameColumn,
} from '@webpackages/typeorm';
import { Scope } from './scope';
import { App } from './app';

@Entity()
export class OAuth extends TimestampEntity implements IOAuth<App, Scope> {
  @UniqueNameColumn() name!: string;
  @OAuthApiTokenColumn() apiKey!: string;
  @OwnerRelation(App) app!: App;
  @ManyRelation(Scope) scopes!: Scope[];
}
