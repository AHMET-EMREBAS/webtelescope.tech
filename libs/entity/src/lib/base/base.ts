import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Column } from '../decorators';
export class IDEntity {
  @PrimaryGeneratedColumn() id!: number;
}

export class BaseEntity extends IDEntity {
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @Column({ type: 'boolean', default: true })
  active!: boolean;
}
