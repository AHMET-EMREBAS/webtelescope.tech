import { IPrint, PropertyPrinter } from '@webpackages/printer';
import { ClassType } from '../common';



/**
 * Implements common property printer operations
 */
export class BasePropertyPrinter extends PropertyPrinter implements IPrint {
  constructor(
    protected readonly classType: ClassType,
    protected readonly propertyName: string,
    protected readonly propertyType: string,
    protected readonly required: boolean
  ) {
    super({ name: propertyName, type: propertyType, required });
  }
}
