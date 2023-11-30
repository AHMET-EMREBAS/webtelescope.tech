import { Relation, Column, Entity } from '@webpackages/core';
@Entity()
export class Sample {
  @Column({ type: 'string', required: true, unique: true })
  name!: string;
}
