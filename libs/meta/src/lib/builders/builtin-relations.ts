import { RelationOptions } from '../meta';
import { CategoryModel } from './builtin-models';

export function CategoryRelation(): RelationOptions {
  return {
    target: 'Category',
    type: 'Many',
    model: CategoryModel(),
  };
}
