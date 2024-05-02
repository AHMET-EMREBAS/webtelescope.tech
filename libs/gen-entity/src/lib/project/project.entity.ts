import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IProject } from '@webpackages/gen-model';
@Entity()
export class Project extends BaseEntity implements IProject {
  /**
   * Required unique short text
   */
  @Column({
    type: 'string',
    required: true,
    unique: true,
    description: 'Required unique short text',
  })
  name!: string;
  @Column({ type: 'string' }) description?: string;
}
