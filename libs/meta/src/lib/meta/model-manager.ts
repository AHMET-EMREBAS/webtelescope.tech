import { PropertyOptionsManager } from '../builders';
import { Model } from './model.meta';
import { PropertyOptions } from './property.meta';
import { RelationOptions, RelationType } from './relation.meta';
import { names } from '@webpackages/utils';

type NameOption = { name: string };
type Name<T> = NameOption & T;
type AsList<T> = Name<T>[];
// type AnyOptions = PropertyOptions | ColumnOptions | RelationOptions;

export function appendName<T>(value: [string, T]): Name<T> {
  return { ...value[1], name: value[0] };
}

export class ModelManager {
  constructor(protected readonly model: Model) {}

  toViewPropertyName(propertyName: string) {
    return names(this.model.modelName + names(propertyName).className)
      .propertyName;
  }

  toColumnProperties() {
    return this.propertiesAsList().map((e) => {
      return new PropertyOptionsManager(e).toColumn();
    });
  }

  toQueryProperties() {
    return this.propertiesAsList().map((e) => {
      return new PropertyOptionsManager(e).toQuery();
    });
  }

  toUpdateProperties() {
    return this.propertiesAsList().map((e) => {
      return new PropertyOptionsManager(e).toUpdate();
    });
  }

  propertyNames() {
    return Object.keys(this.properties());
  }

  relationNames() {
    return Object.keys(this.relations());
  }

  oneRelations() {
    return this.relationsAsList().filter((e) => e.type === RelationType.One);
  }

  ownerRelations() {
    return this.relationsAsList().filter((e) => e.type === RelationType.Owner);
  }

  manyRelations() {
    return this.relationsAsList().filter((e) => e.type === RelationType.Many);
  }

  relations() {
    return this.model.relations || {};
  }

  relationsAsList(): AsList<RelationOptions> {
    return Object.entries(this.relations()).map(appendName<RelationOptions>);
  }

  properties() {
    return this.model.properties || {};
  }

  /**
   * Prefix property names by model name
   */
  toViewPropertyList(): AsList<PropertyOptions> {
    return this.propertiesAsList().map((e) => {
      return {
        ...e,
        name: this.toViewPropertyName(e.name),
      };
    });
  }

  propertiesAsList(): AsList<PropertyOptions> {
    return Object.entries(this.properties()).map(appendName<PropertyOptions>);
  }

  modelName() {
    return this.model.modelName;
  }
}
