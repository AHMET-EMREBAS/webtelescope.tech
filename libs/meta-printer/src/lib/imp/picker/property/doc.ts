import { DocPritner } from '@webpackages/printer';
import { PropertyDocPrinterPicker } from '../../../common';

export const docPrinterPicker: PropertyDocPrinterPicker = (__options) => {
  return new DocPritner({ content: __options.options ?? '' });
};
