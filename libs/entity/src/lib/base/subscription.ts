import { Column, Entity } from '../decorators';
import { BaseEntity } from './base';

@Entity()
export class Subscription extends BaseEntity {
  @Column({ type: 'string', required: true, unique: true })
  username!: string;

  @Column({ type: 'string', required: true })
  password!: string;

  @Column({ type: 'string', required: true, unique: true })
  org!: string;
}
