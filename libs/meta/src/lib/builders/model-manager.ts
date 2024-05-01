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
  rawProperties(): AsList<PropertyOptions> {
    return Object.entries(this.properties()).map(([key, value]) => {
      return { ...value, name: key };
    });
  }

  /**
   * To list of relations
   */
  rawRelations(): AsList<RelationOptions> {
    return Object.entries(this.relations()).map(([key, value]) => {
      return { ...value, name: key };
    });
  }

  /**
   * To list of view columns.
   */
  viewProperties(): AsList<PropertyOptions> {
    return this.rawProperties()
      .filter((e) => !e.excludeFromView)
      .map((e) => {
        return new PropertyManager(e).toView(this.modelName());
      });
  }

  /**
   * To list of query propertiesF
   */
  queryProperties(modelName = '') {
    return this.rawProperties()
      .filter((e) => e.searchable == true && !e.excludeFromView == true)
      .map((e) => {
        return new PropertyManager(e).toQuery(modelName);
      });
  }

  /**
   *
   */
  columnProperties() {
    return this.rawProperties().map((e) => new PropertyManager(e).toColumn());
  }

  updateProperties() {
    return this.rawProperties()
      .filter((e) => e.update != false)
      .map((e) => new PropertyManager(e).toUpdate());
  }

  description() {
    return this.model.description;
  }

  uniqueProperties() {
    return this.rawProperties().filter((e) => e.unique);
  }

  uniqueRelationNames(): string[] {
    return uniq(this.rawRelations().map((e) => e.model.modelName));
  }

  requiredProperties() {
    return this.rawProperties().filter((e) => e.required);
  }

  requiredRelations() {
    return this.rawRelations().filter((e) => e.required);
  }

  propertyNames() {
    return Object.keys(this.properties());
  }

  relationNames() {
    return Object.keys(this.relations());
  }

  oneRelations() {
    return this.rawRelations().filter(
      (e) => e.relationType === RelationType.One
    );
  }

  ownerRelations() {
    return this.rawRelations().filter(
      (e) => e.relationType === RelationType.Owner
    );
  }

  manyRelations() {
    return this.rawRelations().filter(
      (e) => e.relationType === RelationType.Many
    );
  }
}
