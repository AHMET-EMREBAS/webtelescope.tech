import {
  Column as __Column,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  JoinTable,
  Entity as __Entity,
  EntityOptions,
  ColumnOptions as __ColumnOptions,
} from 'typeorm';
import { applyDecorators } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { hashSync, genSaltSync } from 'bcrypt';
export class BaseEntity {
  @PrimaryGeneratedColumn() id!: number;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @DeleteDateColumn() deletedAt!: Date;
}

export function Entity(options: EntityOptions = {}) {
  return applyDecorators(__Entity(options));
}

export type RelationOptions = {
  type: 'One' | 'Many' | 'Owner';
  target: ClassConstructor<BaseEntity>;
};

export function One<T extends BaseEntity>(target: ClassConstructor<T>) {
  return applyDecorators(
    ManyToOne(
      () => target,
      (t) => t.id,
      { nullable: true, eager: true }
    ),
    JoinColumn()
  );
}

export function Many<T extends BaseEntity>(target: ClassConstructor<T>) {
  return applyDecorators(
    ManyToMany(
      () => target,
      (t) => t.id,
      { nullable: true, eager: true }
    ),
    JoinTable()
  );
}

export function Owner<T extends BaseEntity>(target: ClassConstructor<T>) {
  return applyDecorators(
    ManyToOne(
      () => target,
      (t) => t.id,
      { onDelete: 'CASCADE' }
    ),
    JoinColumn()
  );
}

export function Relation(options: RelationOptions): PropertyDecorator {
  if (options.type === 'Many') {
    return Many(options.target);
  } else if (options.type === 'One') {
    return One(options.target);
  } else if (options.type === 'Owner') {
    return Owner(options.target);
  }

  throw new Error(`Relation type ${options.type} is not found! `);
}

export type ColumnOptions = Omit<__ColumnOptions, 'type' | 'nullable'> & {
  type: 'string' | 'number' | 'date' | 'boolean' | 'object' | 'hash';
  required?: boolean;
};

export function Column(options?: ColumnOptions) {
  if (options) {
    const { type } = options;

    const nullable = options.required === true ? false : true;

    if (type === 'string') {
      return __Column({ type: 'varchar', nullable });
    } else if (type === 'boolean') {
      return __Column({ type: 'boolean', nullable: true, default: false });
    } else if (type === 'date') {
      return __Column({ type: 'varchar', nullable });
    } else if (type === 'number') {
      return __Column({ type: 'real', nullable });
    } else if (type === 'object') {
      return __Column({
        type: 'varchar',
        transformer: {
          to(value) {
            return value && JSON.stringify(value);
          },
          from(value) {
            return value && JSON.parse(value);
          },
        },
      });
    } else if (type === 'hash') {
      return __Column({
        type: 'varchar',
        nullable,
        transformer: {
          to(value) {
            return value && hashSync(value, genSaltSync(8));
          },
          from(value) {
            return value;
          },
        },
      });
    }
  }

  return __Column({ type: 'varchar', nullable: true });
}
