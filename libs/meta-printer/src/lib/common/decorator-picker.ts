/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnOptions, PropertyOptions } from '@webpackages/meta';
import { ClassName } from './class-name';
import { DecoratorName } from './decorator-name';
import { excludeUndefined } from '@webpackages/utils';

export class DecoratorNamePicker {
  pick(className: ClassName) {
    switch (className) {
      case ClassName.Create:
      case ClassName.Update:
      case ClassName.Query:
        return DecoratorName.Property;
      case ClassName.Entity:
        return DecoratorName.Column;
      case ClassName.View:
        return DecoratorName.ViewColumn;
      case ClassName.IQuery:
      case ClassName.ICreate:
      case ClassName.IUpdate:
      case ClassName.IEntity:
      case ClassName.IView:
        return '';
    }
  }
}

export class DecoratorRequiredOptionResolver {
  resolve(className: ClassName, options: PropertyOptions): any {
    switch (className) {
      case ClassName.Create:
        return options;
      case ClassName.Update:
        return { ...options, required: false };
      case ClassName.Query:
        return excludeUndefined({
          ...options,
          required: false,
          searchable: undefined,
        });
      case ClassName.Entity: {
        const { type, description, isArray, objectType, required, unique } =
          options;
        return {
          type,
          description,
          isArray,
          objectType,
          required,
          unique,
        } as ColumnOptions;
      }
      case ClassName.View:
        return '';
      case ClassName.IQuery:
      case ClassName.ICreate:
      case ClassName.IUpdate:
      case ClassName.IEntity:
      case ClassName.IView:
        return '';
    }
  }
}
