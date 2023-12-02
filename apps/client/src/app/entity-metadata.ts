import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import {
  inventoryEntityMetadata,
  inventoryPluralNames,
} from '@webpackages/inventory-client';

const entityMetadata: EntityMetadataMap = {
  ...inventoryEntityMetadata,
};

const pluralNames = {
  ...inventoryPluralNames,
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
