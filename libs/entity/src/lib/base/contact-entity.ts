import { Column, Entity, Relation } from '../decorators';
import { BaseEntity } from './base-entity';
import { User } from './user-entity';

@Entity()
export class Contact extends BaseEntity {
  @Column({ type: 'string', required: true })
  unit?: string;

  @Column({ type: 'string', required: true })
  street?: string;

  @Column({ type: 'string', required: true })
  city?: string;

  @Column({ type: 'string', required: true })
  state?: string;

  @Column({ type: 'string', required: true })
  country?: string;

  @Column({ type: 'string', required: true })
  zip?: string;

  @Relation({ type: 'Owner', target: User })
  user!: User;
}
