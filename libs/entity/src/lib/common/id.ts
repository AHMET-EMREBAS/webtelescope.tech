import { IID } from '@webpackages/model';
import { PrimaryGeneratedColumn } from 'typeorm';

export class IDEntity implements IID {
  @PrimaryGeneratedColumn() id!: number;
}
