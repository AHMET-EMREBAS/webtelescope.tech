import { RelationProperty } from '../meta';
import { CategoryModel } from './builtin-models';

export function CategoryRelation(): RelationProperty {
  return {
    target: 'Category',
    type: 'Many',
    model: CategoryModel(),
  };
}
