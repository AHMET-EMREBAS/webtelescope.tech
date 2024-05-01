import { IPrint } from '@webpackages/printer';
import { IPickBy } from '../common/picker';
import { ICoverAllClassTypes } from '../common/cover-all-class-types';

/**
 * Convenient builder for any class implements  {@link ICoverAllClassTypes} 
 */
export class PrinterPicker
  implements IPickBy<keyof ICoverAllClassTypes<IPrint>, IPrint>
{
  constructor(
    protected readonly builderInstance: ICoverAllClassTypes<IPrint>
  ) {}

  Pick(type: keyof Omit<ICoverAllClassTypes<IPrint>, 'Pick'>): IPrint {
    switch (type) {
      case 'Entity':
        return this.builderInstance.Entity();
      case 'View':
        return this.builderInstance.View();
      case 'Create':
        return this.builderInstance.Create();
      case 'Update':
        return this.builderInstance.Update();
      case 'Query':
        return this.builderInstance.Query();
      case 'IEntity':
        return this.builderInstance.IEntity();
      case 'IView':
        return this.builderInstance.IView();
      case 'ICreate':
        return this.builderInstance.ICreate();
      case 'IUpdate':
        return this.builderInstance.IUpdate();
      case 'IQuery':
        return this.builderInstance.IQuery();
    }
  }
}
