import { IID } from '@webpackages/common';
import { PrimaryGeneratedColumn } from 'typeorm';
import { ViewColumn } from './column';

export abstract class IDEntity implements IID {
  @PrimaryGeneratedColumn()
  id!: number;
}

export abstract class IDEntityView implements IID {
  @ViewColumn() id!: number;
}
