import { PropertyManager } from '.';
import { Model } from '../meta/model.meta';
import { PropertyOptions } from '../meta/property.meta';
import { RelationOptions, RelationType } from '../meta/relation.meta';

type AsList<T> = T[];
// type AnyOptions = PropertyOptions | ColumnOptions | RelationOptions;

export class ModelManager {
  constructor(protected readonly model: Model) {}

  relations() {
    return this.model.relations || {};
  }

  properties() {
    return this.model.properties || {};
  }

  modelName() {
    return this.model.modelName;
  }

  /**
   * To list of properties
   */
  __propertiesList(): AsList<PropertyOptions> {
    return Object.entries(this.properties()).map(([key, value]) => {
      return { ...value, name: key };
    });
  }

  /**
   * To list of relations
   */
  __relationsList(): AsList<RelationOptions> {
    return Object.entries(this.relations()).map(([key, value]) => {
      return { ...value, name: key };
    });
  }

  /**
   * To list of view columns.
   */
  viewProperties(): AsList<PropertyOptions> {
    return this.__propertiesList()
      .filter((e) => !e.excludeFromView)
      .map((e) => {
        return new PropertyManager(e).toView(this.modelName());
      });
  }

  /**
   * To list of query propertiesF
   */
  queryProperties() {
    return this.__propertiesList()
      .filter((e) => e.searchable != false)
      .map((e) => {
        return new PropertyManager(e).toQuery();
      });
  }

  /**
   * 
   */
  columnProperties() {
    return this.__propertiesList().map((e) =>
      new PropertyManager(e).toColumn()
    );
  }

  updateProperties() {
    return this.__propertiesList()
      .filter((e) => e.update != false)
      .map((e) => new PropertyManager(e).toUpdate());
  }

  description() {
    return this.model.description;
  }

  uniqueProperties() {
    return this.__propertiesList().filter((e) => e.unique);
  }

  requiredProperties() {
    return this.__propertiesList().filter((e) => e.required);
  }

  requiredRelations() {
    return this.__relationsList().filter((e) => e.required);
  }

  propertyNames() {
    return Object.keys(this.properties());
  }

  relationNames() {
    return Object.keys(this.relations());
  }

  oneRelations() {
    return this.__relationsList().filter((e) => e.type === RelationType.One);
  }

  ownerRelations() {
    return this.__relationsList().filter((e) => e.type === RelationType.Owner);
  }

  manyRelations() {
    return this.__relationsList().filter((e) => e.type === RelationType.Many);
  }
}
