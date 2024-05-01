import { uniq } from '@webpackages/utils';
import {
  Model,
  PropertyOptions,
  RelationOptions,
  RelationType,
} from '../common-imp';
import { PropertyManager } from './property-manager';

type AsList<T> = T[];

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
  propertiesList(): AsList<PropertyOptions> {
    return Object.entries(this.properties()).map(([key, value]) => {
      return { ...value, name: key };
    });
  }

  relationsList(): AsList<RelationOptions> {
    return Object.entries(this.relations()).map(([key, value]) => {
      return { ...value, name: key };
    });
  }

  viewProperties(): AsList<PropertyOptions> {
    return this.propertiesList()
      .filter((e) => !e.excludeFromView)
      .map((e) => {
        return new PropertyManager(e).toView(this.modelName());
      });
  }

  queryProperties(modelName = '') {
    return this.propertiesList()
      .filter((e) => e.searchable != false)
      .map((e) => {
        return new PropertyManager(e).toQuery(modelName);
      });
  }

  /**
   * Convert properties into column properties
   */
  columnProperties() {
    return this.propertiesList().map((e) => new PropertyManager(e).toColumn());
  }

  updateProperties() {
    return this.propertiesList()
      .filter((e) => e.update != false)
      .map((e) => new PropertyManager(e).toUpdate());
  }

  uniqueProperties() {
    return this.propertiesList().filter((e) => e.unique);
  }

  uniqueRelationNames(): string[] {
    return uniq(this.relationsList().map((e) => e.model.modelName));
  }

  requiredProperties() {
    return this.propertiesList().filter((e) => e.required);
  }

  requiredRelations() {
    return this.relationsList().filter((e) => e.required);
  }

  propertyNames() {
    return Object.keys(this.properties());
  }

  relationNames() {
    return Object.keys(this.relations());
  }

  oneRelations() {
    return this.relationsList().filter(
      (e) => e.relationType === RelationType.One
    );
  }

  ownerRelations() {
    return this.relationsList().filter(
      (e) => e.relationType === RelationType.Owner
    );
  }

  manyRelations() {
    return this.relationsList().filter(
      (e) => e.relationType === RelationType.Many
    );
  }

  /**
   * Model description
   */
  description() {
    return this.model.description;
  }
}
