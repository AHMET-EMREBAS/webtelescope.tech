export enum DecoratorName {
  Property = 'Property',
  Column = 'Column',
  Relation = 'Relation',
  Dto = 'Dto',
  Entity = 'Entity',
  ViewEntity = 'ViewEntity',
  ViewColumn = 'ViewColumn',
}

export interface IDecoratorNameProvider {
  Dto(): string;
  Property(): string;
  Entity(): string;
  Column(): string;
  Relation(): string;
  ViewEntity(): string;
  ViewColumn(): string;
}

export class DecoratorNameProvider implements IDecoratorNameProvider {
  Dto(): string {
    return DecoratorName.Dto;
  }
  Property(): string {
    return DecoratorName.Property;
  }
  Entity(): string {
    return DecoratorName.Entity;
  }
  Column(): string {
    return DecoratorName.Column;
  }
  Relation(): string {
    return DecoratorName.Relation;
  }
  ViewEntity(): string {
    return DecoratorName.ViewEntity;
  }
  ViewColumn(): string {
    return DecoratorName.ViewColumn;
  }
}
