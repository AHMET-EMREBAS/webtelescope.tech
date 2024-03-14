import { BaseEntity, Column, Entity } from '@webpackages/entity';

@Entity()
export class Sample extends BaseEntity {
  @Column({ type: 'string', unique: true, required: true })
  name!: string;
}
