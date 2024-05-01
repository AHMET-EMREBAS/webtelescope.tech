import { Model, PropertyOptions } from '../common-imp';
import { ModelManager } from './model-manager';

enum PropertyTypes {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
}

enum RelationTypes {
  Many = 'Many',
  One = 'One',
  Owner = 'Owner',
}

const nameProprty: PropertyOptions = {
  type: PropertyTypes.string,
  minLength: 3,
  maxLength: 30,
  required: false,
  description: 'Property description',
  unique: true,
  searchable: true,
  update: true,
};

const categoryModel: Model = {
  modelName: 'Category',
  description: 'Category description',
  properties: {
    name: nameProprty,
  },
};

const departmentModel: Model = {
  modelName: 'Department',
  description: 'Department description',
  properties: {
    name: nameProprty,
  },
};

const sampleModel: Model = {
  modelName: 'Sample',
  description: 'Sample description',
  properties: {
    name: nameProprty,
    age: nameProprty,
  },
  relations: {
    categories: {
      model: categoryModel,
      relationType: RelationTypes.Many,
      required: true,
    },
    department: {
      model: departmentModel,
      relationType: RelationTypes.One,
      required: false,
    },
  },
};

describe('ModelManager', () => {
  let manager: ModelManager;
  beforeAll(() => {
    manager = new ModelManager(sampleModel);
  });

  it('propertyNames', () => {
    const r = manager.propertyNames();
    expect(r.includes('name')).toBeTruthy();
    expect(r.includes('age')).toBeTruthy();
  });

  it('should return relationNames', () => {
    const r = manager.relationNames();
    expect(r.includes('categories')).toBeTruthy();
    expect(r.includes('department')).toBeTruthy();
  });

  it('should return model name', () => {
    expect(manager.modelName()).toBe('Sample');
  });
});
