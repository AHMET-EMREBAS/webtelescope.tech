import { IID } from '@webpackages/common';
import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class IDEntity implements IID {
  @PrimaryGeneratedColumn()
  id!: number;
}
