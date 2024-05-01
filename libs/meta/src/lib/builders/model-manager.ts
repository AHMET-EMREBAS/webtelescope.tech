import { uniq } from '@webpackages/utils';
import { PropertyManager } from './property-manager';
import {
  Model,
  PropertyOptions,
  RelationOptions,
  RelationType,
} from '../common-imp';

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
      const r: PropertyOptions = { ...value, propertyName: key };
      return r;
    });
  }

  /**
   * To list of relations
   */
  relationsList(): AsList<RelationOptions> {
    return Object.entries(this.relations()).map(([key, value]) => {
      const r: RelationOptions = { ...value, relationName: key };
      return r;
    });
  }

  /**
   * To list of view columns.
   */
  viewProperties(): AsList<PropertyOptions> {
    return this.propertiesList()
      .filter((e) => !e.excludeFromView)
      .map((e) => {
        return new PropertyManager(e).toView(this.modelName());
      });
  }

  /**
   * To list of query propertiesF
   */
  queryProperties(modelName = '') {
    return this.propertiesList()
      .filter((e) => e.searchable == true && !e.excludeFromView == true)
      .map((e) => {
        return new PropertyManager(e).toQuery(modelName);
      });
  }

  /**
   *
   */
  columnProperties() {
    return this.propertiesList().map((e) => new PropertyManager(e).toColumn());
  }

  updateProperties() {
    return this.propertiesList()
      .filter((e) => e.update != false)
      .map((e) => new PropertyManager(e).toUpdate());
  }

  description() {
    return this.model.description;
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
}
