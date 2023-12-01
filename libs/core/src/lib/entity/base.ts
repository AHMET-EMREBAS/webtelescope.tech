import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt';

export class BaseEntity {
  @PrimaryGeneratedColumn() id!: number;
  @CreateDateColumn() createdAt?: Date;
  @UpdateDateColumn() updatedAt?: Date;
  @DeleteDateColumn() deletedAt?: Date;
  @Column({ type: 'boolean', nullable: true }) active?: boolean;
  @Column({ type: 'numeric', nullable: true }) createdBy?: number;
  @Column({ type: 'numeric', nullable: true }) updatedBy?: number;
}

export class BaseNameEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true }) name?: string;
}

export class BaseNameDescriptionEntity extends BaseNameEntity {
  @Column({ type: 'varchar', nullable: true }) description?: string;
}

export class BaseUserEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true }) username!: string;
  @Column({
    type: 'varchar',
    transformer: {
      to(value) {
        return hashSync(value, genSaltSync(8));
      },
      from(value) {
        return value;
      },
    },
  })
  password!: string;
}
