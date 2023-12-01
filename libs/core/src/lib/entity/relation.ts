import { applyDecorators } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base';

export type RelationOptions = {
  type: 'sub' | 'subs' | 'owner';
  target: ClassConstructor<BaseEntity>;
};
export function Relation(options: RelationOptions) {
  const { target, type } = options;

  if (type === 'owner') {
    return applyDecorators(
      ManyToOne(
        () => target,
        (e) => e.id,
        { eager: true, onDelete: 'CASCADE' }
      ),
      JoinColumn()
    );
  } else if (type === 'sub') {
    return applyDecorators(
      ManyToOne(
        () => target,
        (e) => e.id,
        { eager: true, nullable: true }
      ),
      JoinColumn()
    );
  } else if (type === 'subs') {
    return applyDecorators(
      ManyToMany(
        () => target,
        (e) => e.id,
        { eager: true, nullable: true }
      ),
      JoinTable()
    );
  }
  throw new Error('Relation type is required!');
}
