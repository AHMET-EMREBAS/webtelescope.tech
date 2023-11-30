import { RelationMeta } from '@webpackages/meta';
import { propertyDecorators } from '@webpackages/utils';
import { ClassConstructor } from 'class-transformer';
import { JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

export function Relation<T extends { id: number }>(
  options: Pick<RelationMeta, 'type'> & {
    target: ClassConstructor<T>;
  }
) {
  const { type, target } = options;

  if (type === 'owner') {
    return propertyDecorators(
      ManyToOne(
        () => target,
        (e) => e.id,
        { onDelete: 'CASCADE' }
      ),
      JoinTable()
    );
  } else if (type === 'sub') {
    return propertyDecorators(
      ManyToOne(
        () => target,
        (e) => e.id,
        { eager: true, nullable: true }
      ),
      JoinColumn()
    );
  } else if (type === 'subs') {
    return propertyDecorators(
      ManyToMany(
        () => target,
        (e) => e.id,
        { eager: true, nullable: true }
      )
    );
  }

  return propertyDecorators();
}
