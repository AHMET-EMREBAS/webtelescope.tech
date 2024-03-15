import { Column, Entity, Relation } from '../decorators';
import { BaseEntity } from './base';
import { Image } from './image';
import { User } from './user';

@Entity()
export class Blog extends BaseEntity {
  @Column({ type: 'string', required: true, unique: true }) title!: string;
  @Relation({ type: 'Owner', target: User }) author!: User;
}

@Entity()
export class Article extends BaseEntity {
  @Column({ type: 'string', required: true }) title!: string;
  @Column({ type: 'string', required: true }) content!: string;
  @Relation({ type: 'Many', target: Image }) images?: Image[];
  @Relation({ type: 'Owner', target: User }) blog!: Blog;
}
