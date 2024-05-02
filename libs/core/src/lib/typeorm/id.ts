import { IID } from '@webpackages/common';
import { PrimaryGeneratedColumn } from 'typeorm';
import { ViewColumn } from './column';
import { Dto, Property } from '../property';

@Dto()
export class IDDto {
  @Property({ type: 'number', required: true })
  id!: number;
}

export abstract class IDEntity implements IID {
  @PrimaryGeneratedColumn()
  id!: number;
}

export abstract class IDEntityView implements IID {
  @ViewColumn() id!: number;
}
