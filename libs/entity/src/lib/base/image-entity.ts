import { Column, Entity } from '../decorators';
import { BaseEntity } from './base-entity';

@Entity()
export class Image extends BaseEntity {
  @Column({ type: 'string' })
  src!: string;

  @Column({ type: 'string' })
  position?: string;
}
