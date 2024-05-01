import { ICoverAllClassTypes } from '../common/cover-all-class-types';
import { IDecoratorNameProvider } from './decorator-name-provider';

/**
 * Provides list of decorator names by class type
 */
export class DecoratorListProvider implements ICoverAllClassTypes<string[]> {
  constructor(
    protected readonly decoratorNameProvider: IDecoratorNameProvider
  ) {}
  Entity(): string[] {
    return [
      this.decoratorNameProvider.Column(),
      this.decoratorNameProvider.Entity(),
    ];
  }
  View(): string[] {
    return [
      this.decoratorNameProvider.ViewEntity(),
      this.decoratorNameProvider.ViewColumn(),
    ];
  }
  Create(): string[] {
    return [
      this.decoratorNameProvider.Dto(),
      this.decoratorNameProvider.Property(),
    ];
  }
  Update(): string[] {
    return [
      this.decoratorNameProvider.Dto(),
      this.decoratorNameProvider.Property(),
    ];
  }
  Query(): string[] {
    return [
      this.decoratorNameProvider.Dto(),
      this.decoratorNameProvider.Property(),
    ];
  }
  IEntity(): string[] {
    return [];
  }
  IView(): string[] {
    return [];
  }
  ICreate(): string[] {
    return [];
  }
  IUpdate(): string[] {
    throw new Error('Method not implemented.');
  }
  IQuery(): string[] {
    return [];
  }
}
