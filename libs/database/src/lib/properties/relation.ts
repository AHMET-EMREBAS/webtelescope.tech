import { applyDecorators } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

export type CommonColumnOptions<T extends { id?: number } = { id?: number }> = {
  target: ClassConstructor<T>;
};

export function OwnerRelation(options: CommonColumnOptions) {
  return applyDecorators(
    ManyToOne(
      () => options.target,
      (t) => t.id,
      { onDelete: 'CASCADE' }
    ),
    JoinColumn()
  );
}

export function OneRelation(options: CommonColumnOptions) {
  return applyDecorators(
    ManyToOne(
      () => options.target,
      (t) => t.id,
      { eager: true, nullable: true }
    ),
    JoinColumn()
  );
}

export function ManyRelation(options: CommonColumnOptions) {
  return applyDecorators(
    ManyToMany(
      () => options.target,
      (t) => t.id,
      { eager: true, nullable: true }
    ),
    JoinTable()
  );
}
