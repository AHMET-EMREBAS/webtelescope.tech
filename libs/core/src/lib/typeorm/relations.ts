import { Type, applyDecorators } from '@nestjs/common';
import { JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

interface IID {
  id: number;
}

/**
 * Create owner relation (many to one)
 * @param target
 * @returns
 */
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

/**
 * Create many to one relation
 * @param target
 * @returns
 */
export function One<T extends IID>(target: Type<T>) {
  return applyDecorators(
    ManyToOne(
      () => target,
      (t) => t.id,
      { nullable: false, eager: true }
    ),
    JoinColumn()
  );
}

/**
 * Create many to many relation
 * @param target
 * @returns
 */
export function Many<T extends IID>(target: Type<T>) {
  return applyDecorators(
    ManyToMany(
      () => target,
      (t) => t.id,
      { nullable: false, eager: true }
    ),
    JoinTable()
  );
}

export type RelationOptions = {
  relationType: 'Many' | 'One' | 'Owner';
  objectType: Type;
  required?: boolean;
};

export function Relation(options: RelationOptions) {
  switch (options.relationType) {
    case 'Many':
      return Many(options.objectType);
    case 'One':
      return One(options.objectType);
    case 'Owner':
      return Owner(options.objectType);
  }
}
