import { Type, applyDecorators } from '@nestjs/common';
import { JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

interface IID {
  id: number;
}
export function Owner<T extends IID>(target: Type<T>) {
  return applyDecorators(
    ManyToOne(
      () => target,
      (e) => e.id,
      {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        createForeignKeyConstraints: true,
      }
    ),
    JoinColumn()
  );
}

export function One<T extends IID>(target: Type<T>) {
  return applyDecorators(
    ManyToOne(
      () => target,
      (t) => t.id,
      { nullable: false }
    ),
    JoinColumn()
  );
}

export function Many<T extends IID>(target: Type<T>) {
  return applyDecorators(
    ManyToMany(
      () => target,
      (t) => t.id,
      { nullable: false }
    ),
    JoinTable()
  );
}
