import { Column, Entity, Relation } from '../decorators';
import { BaseEntity } from './base-entity';
import { Image } from './image-entity';

@Entity()
export class Profile extends BaseEntity {
  @Column({ type: 'string', required: true })
  firstName!: string;

  @Column({ type: 'string', required: true })
  lastName!: string;

  @Relation({ type: 'Many', target: Image })
  images?: Image;
}
