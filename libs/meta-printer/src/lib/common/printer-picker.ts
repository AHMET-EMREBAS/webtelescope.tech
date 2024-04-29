import {
  ColumnOptions,
  PropertyOptions,
  RelationOptions,
} from '@webpackages/meta';
import { IPrint } from '@webpackages/printer';
import { ClassName } from './class-name';
import { Picker } from './picker';

export type PrinterPickerOptions<T> = { classType: ClassName; options: T };
export type PrinterPicker<T> = Picker<PrinterPickerOptions<T>, IPrint>;

// DOc
export type DocPrinterPicker<T = string> = PrinterPicker<T | undefined>;

// Property
export type PropertyDecoratorPrinterPickerOptions =
  PrinterPickerOptions<PropertyOptions>;
export type PropertyDecoratorPrinterPicker = PrinterPicker<PropertyOptions>;

// Columns
export type ColumnDecoratorPrinterPickerOptions =
  PrinterPickerOptions<ColumnOptions>;
export type ColumnDecoratorPrinterPicker = PrinterPicker<ColumnOptions>;

// Relations
export type RelationDecoratorPrinterPickerOptions =
  PrinterPickerOptions<RelationOptions>;
export type RelationDecoratorPrinterPicker = PrinterPicker<RelationOptions>;
