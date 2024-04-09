import { IApp } from '@webpackages/model';
import { IDEntity, UniqueNameColumn } from '@webpackages/typeorm';
import { Entity } from 'typeorm';

@Entity()
export class App extends IDEntity implements IApp {
  @UniqueNameColumn() appName!: string;
}
