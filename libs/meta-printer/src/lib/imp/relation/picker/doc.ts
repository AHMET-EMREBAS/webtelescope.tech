import { DocPritner } from '@webpackages/printer';
import { DocPrinterPicker } from '../../../common';

export const docPicker: DocPrinterPicker = (__options) => {
  return new DocPritner({ content: __options.options ?? '' });
};
