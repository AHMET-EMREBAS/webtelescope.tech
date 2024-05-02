import { names } from '@webpackages/utils';
import { Model, OwnerRelation, ShortTextProperty } from './core';

export function CreateAddressFor(model: Model): Model {
  return {
    modelName: `${model.modelName}Contact`,
    properties: {
      state: ShortTextProperty({
        icon: 'state',
        autocomplete: 'address-level1',
      }),
      city: ShortTextProperty({ icon: 'city', autocomplete: 'address-level2' }),
      street: ShortTextProperty({
        icon: 'street',
        autocomplete: 'street-address',
      }),
      zip: ShortTextProperty({ icon: 'zip', autocomplete: 'postal-code' }),
    },
    relations: {
      [names(model.modelName).propertyName]: OwnerRelation(model),
    },
  };
}

export function CreateEmailModelFor(model: Model): Model {
  return {
    modelName: `${model.modelName}Email`,
    properties: {
      email: ShortTextProperty({ format: 'email', icon: 'email' }),
    },
    relations: {
      [names(model.modelName).propertyName]: OwnerRelation(model),
    },
  };
}

export function CreatePhoneModelFor(model: Model): Model {
  return {
    modelName: `${model.modelName}Phone`,
    properties: {
      email: ShortTextProperty({ format: 'email', autocomplete: 'email' }),
    },
    relations: {
      [names(model.modelName).propertyName]: OwnerRelation(model),
    },
  };
}
