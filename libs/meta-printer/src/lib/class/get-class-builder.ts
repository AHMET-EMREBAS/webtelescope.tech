import { Model, ModelManager } from '@webpackages/meta';
import {
  ClassNameBuilder,
  DecoratorListProvider,
  DecoratorNameProvider,
  PackageNameProvider,
} from '../common-imp';
import { ClassBuilder } from './class';
import { ClassDecoratorBuilder } from '../decorator';
import { ClassImportBuilder } from '../imports';
import { ExtendingBuilder } from './extending';
import { ImplementingBuilder } from './implementing';
import { GenericsBuilder } from './generics-builder';

export function getClassBuilder(model: Model): ClassBuilder {
  const modelManager = new ModelManager(model);
  const classNameBuilder = new ClassNameBuilder(model.modelName);
  const packageManagerProvider = new PackageNameProvider();
  const decoratorNameProvider = new DecoratorNameProvider();
  const decoratorListProvider = new DecoratorListProvider(
    decoratorNameProvider
  );

  return new ClassBuilder(
    modelManager,
    classNameBuilder,
    new ClassDecoratorBuilder(modelManager),
    new ClassImportBuilder(
      modelManager,
      packageManagerProvider,
      classNameBuilder,
      decoratorListProvider
    ),
    new ExtendingBuilder(modelManager),
    new ImplementingBuilder(modelManager, classNameBuilder),
    new GenericsBuilder(modelManager)
  );
}
