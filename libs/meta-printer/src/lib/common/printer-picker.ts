import { IPrint, PropertyOptions } from '../core';
import { ClassType } from './class-type';
import { Picker } from './picker';

export type PrinterPickerOptions<T> = { classType: ClassType; options: T };

export type PrinterPicker<T> = Picker<PrinterPickerOptions<T>, IPrint>;

export type PropertyDecoratorPrinterPicker = PrinterPicker<PropertyOptions>;

export type PropertyDeocPrinterPicker<T = string> = PrinterPicker<
  T | undefined
>;
