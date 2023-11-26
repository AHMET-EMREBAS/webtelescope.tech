import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base';
import { User } from './user';

@Entity()
export class Message extends BaseEntity {
  @Column({ type: 'varchar' })
  message!: string;

  @ManyToOne(() => User, (u) => u.id)
  @JoinColumn()
  toUser!: User;

  @ManyToOne(() => User, (u) => u.id)
  @JoinColumn()
  fromUser!: User;
}
