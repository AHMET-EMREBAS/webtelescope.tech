import { ModelManager, NameModel } from '@webpackages/meta';
import {
  ClassNameBuilder,
  DecoratorListProvider,
  DecoratorNameProvider,
  FileNameBuilder,
  PackageNameProvider,
} from '../common-imp';
import { ClassImportBuilder } from './class';

describe('ClassImportBuilder', () => {
  it('should print the required imports for by class type', () => {
    const imports = new ClassImportBuilder(
      new ModelManager(NameModel('Category')),
      new PackageNameProvider(),
      new ClassNameBuilder('Sample'),
      new FileNameBuilder('Sample'),
      new DecoratorListProvider(new DecoratorNameProvider())
    );

    console.log('Entity', imports.Entity().print());
    console.log('Create', imports.Create().print());
    console.log('Update', imports.Update().print());
    console.log('Query', imports.Query().print());
    console.log('ICreate', imports.ICreate().print());
    console.log('IUpdate', imports.IUpdate().print());
    console.log('IQuery', imports.IQuery().print());
  });
});
