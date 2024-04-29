import {
  ClassName,
  EmptyPrinter,
  RelationDecoratorPrinterPicker,
  RelationDecoratorPrinterPickerOptions,
} from '../../../common';
import { stringify } from '../../../utils';
import { RelationType } from '@webpackages/meta';

export const decoratorPicker: RelationDecoratorPrinterPicker = (
  __options: RelationDecoratorPrinterPickerOptions
) => {
  const { classType, options } = __options;
  const { model, type } = options;

  const isArray = (type:RelationType)=>type == RelationType.Many ? true :false; 
  
  switch (classType) {
    case ClassName.Create:
      return new DecoratorPrinter({
        name: '',
        options: stringify({
          type: 'ID',
          required: options.required ? true : false,
          isArray:isArray(type)
        }),
      });
    case ClassName.Update:
      return new DecoratorPrinter({
        name: 'Property',
        options: stringify({
          type: 'ID',
          required: false,
          isArray: true
        }),
      });
    case ClassName.Entity:
      return new DecoratorPrinter({
        name: type,
        options: model.modelName,
      });

    // Relation properties will not fall in the following cases!
    case ClassName.View:
    case ClassName.Query:
    case ClassName.ICreate:
    case ClassName.IEntity:
    case ClassName.IQuery:
    case ClassName.IUpdate:
    case ClassName.IView:
      return EmptyPrinter;
  }
};
