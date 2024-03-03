import {
  IBasicEntity,
  IOwnedEntity,
  ITimestampEntity,
} from '@webpackages/common';
import {
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClassConstructor } from 'class-transformer';

export class BasicEntity implements IBasicEntity {
  @PrimaryGeneratedColumn()
  id!: number;
}

export class TimestampEntity extends BasicEntity implements ITimestampEntity {
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @DeleteDateColumn() deletedAt!: Date;
}

class __OwnedEntity<U> extends TimestampEntity implements IOwnedEntity<U> {
  owner!: U;
}

export function OwnedEntity<U>(
  ownerEntity: ClassConstructor<U>
): ClassConstructor<__OwnedEntity<U>> {
  class OwnedEntityExtened<U> extends __OwnedEntity<U> {
    @ManyToOne(() => ownerEntity)
    @JoinColumn()
    override owner!: U;
  }

  return OwnedEntityExtened<U>;
}
