import { names } from '@webpackages/utils';
import { PrintableModelMeta } from '../../meta';
import { Printable } from '../common';
import { EntityImports } from './entity-imports';

export class ViewEntityPrinter implements Printable {
  constructor(public readonly options: PrintableModelMeta) {}

  printOwnColumn() {
    return Object.entries(this.options.properties || {}).map(([key]) => {
      return `@ViewColumn() ${key}?:any;`;
    });
  }

  printOwnSelect() {
    return Object.entries(this.options.properties || {}).map(([key]) => {
      return `.addSelect('main.${key}', '${key}')`;
    });
  }

  printViewColumns() {
    return Object.entries(this.options.relations || {})
      .map(([, value]) => {
        return Object.entries(value.views || {}).map(([, viewName]) => {
          return `@ViewColumn() ${viewName}?:any;`;
        });
      })
      .join('\n');
  }

  printSelects(): string {
    return Object.entries(this.options.relations || {})
      .map(([key, value]) => {
        if (value.views) {
          return Object.entries(value.views).map(([propertyName, viewName]) => {
            return `.addSelect('${key}.${propertyName}', '${viewName}')`;
          });
        }
        return '';
      })
      .join('\n');
  }

  printJoins() {
    return Object.entries(this.options.relations || {}).map(([key, value]) => {
      return `.leftJoin(${value.target}, '${value.name}', '${value.name}.id = main.${key}Id')`;
    });
  }

  printImports() {
    if (this.options.relations) {
      return Object.values(this.options.relations)
        .map((value) => {
          return new EntityImports(value.target).print();
        })
        .join('\n');
    }

    return '';
  }

  print(): string {
    const className = names(this.options.name).className;
    const fileName = names(this.options.name).fileName;
    return `
  import { ViewEntity, ViewColumn, DataSource } from 'typeorm';
  import { ${className} } from './${fileName}.entity';
  ${this.printImports()}

  @ViewEntity({ 
    expression(ds:DataSource){ 

        return ds.createQueryBuilder()
        .select('main.id', 'id')
        ${this.printOwnSelect()}
        ${this.printSelects()}
        .from(${className}, 'main')
        ${this.printJoins()}
        
    }
  })
  export class ${names(this.options.name).className}View { 

    @ViewColumn() id?:number; 
    ${this.printOwnColumn()}
    ${this.printViewColumns()}
  }
  `;
  }
}
