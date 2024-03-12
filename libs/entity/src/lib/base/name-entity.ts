import { Column } from '../decorators';
import { BaseEntity } from './base-entity';

/**
 * Entity with unique & requried name property
 */
export class NameEntity extends BaseEntity {
  @Column({ type: 'string', unique: true, required: true })
  name!: string;
}
