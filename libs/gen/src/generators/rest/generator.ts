import { formatFiles, generateFiles, Tree, names } from '@nx/devkit';
import * as path from 'path';
import { RestGeneratorSchema } from './schema';
import {
  DtoPrinter,
  EntityPrinter,
  PrintableModelMeta,
  ViewEntityPrinter,
} from '@webpackages/meta';
export async function restGenerator(tree: Tree, options: RestGeneratorSchema) {
  const projectRoot = `libs/${options.project}/src/lib`;

  const model: PrintableModelMeta = await import(
    `libs/meta/src/lib/models/${options.name}`
  ).then((e) => e[`${names(options.name).className}Model`]);

  const entityContent = new EntityPrinter(model).print();
  const dtoContent = new DtoPrinter('Create', model).print();
  const viewEntityContent = new ViewEntityPrinter(model).print();

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...names(options.name),
    entityContent,
    dtoContent,
    viewEntityContent,
  });
  await formatFiles(tree);
}

export default restGenerator;
