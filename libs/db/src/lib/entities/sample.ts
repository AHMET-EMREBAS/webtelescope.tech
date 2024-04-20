import { Entity, Column, PrimaryGeneratedColumn } from '@webpackages/core';

@Entity()
export class Sample {
  @PrimaryGeneratedColumn() id!: number;
  @Column() name?: string;
}
