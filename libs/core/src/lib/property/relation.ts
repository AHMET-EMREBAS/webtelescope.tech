/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyDecorators } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

export function Many(target: ClassConstructor<any>) {
  return applyDecorators(
    ManyToMany(
      () => target,
      (t) => t.id,
      { eager: true, nullable: true }
    ),
    JoinTable()
  );
}

export function One(target: ClassConstructor<any>) {
  return applyDecorators(
    ManyToOne(
      () => target,
      (t) => t.id,
      { eager: true, nullable: true }
    ),
    JoinColumn()
  );
}

export function Owner(target: ClassConstructor<any>) {
  return applyDecorators(
    ManyToOne(
      () => target,
      (t) => t.id,
      { cascade: true }
    ),
    JoinColumn()
  );
}
