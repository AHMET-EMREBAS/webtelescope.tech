import { DecoratorPrinter } from '@webpackages/printer';
import {
  ClassType,
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
  switch (classType) {
    case ClassType.CREATE:
    case ClassType.UPDATE:
      return new DecoratorPrinter({
        name: 'Property',
        options: stringify({
          type: 'ID',
          required: options.required ? true : false,
          isArray: options.type === RelationType.Many ? true : false,
        }),
      });
    case ClassType.ENTITY:
      return new DecoratorPrinter({
        name: type,
        options: model.modelName,
      });

    // Relation properties will not fall in the following cases!
    case ClassType.VIEW:
    case ClassType.QUERY:
    case ClassType.ICREATE:
    case ClassType.IENTITY:
    case ClassType.IQUERY:
    case ClassType.IUPDATE:
    case ClassType.IVIEW:
      return EmptyPrinter;
  }
};
