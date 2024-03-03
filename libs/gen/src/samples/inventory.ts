import { Entities, EntitySchema, Properties, Relations } from '../meta';

type ClassNames = 'Product' | 'Category' | 'Department' | 'Price' | 'Quantity';

type PropertyNames = 'name' | 'description' | 'category' | 'price' | 'cost';

export interface InventoryEntitySchema<PN extends string = PropertyNames>
  extends EntitySchema<ClassNames, PN> {}

export const CategoryMeta = Entities.nameEntity();
export const DepartmentMeta = Entities.nameEntity();
export const StoreMeta = Entities.nameEntity();
export const PriceLevelMeta = Entities.nameEntity();


export const ProductMeta: InventoryEntitySchema = {
  properties: {
    name: Properties.NAME,
    description: Properties.DESCRIPTION,
  },

  relations: {
    category: Relations.sub('Category'),
  },
};
