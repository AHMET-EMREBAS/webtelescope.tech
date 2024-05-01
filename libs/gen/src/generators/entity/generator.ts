import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { EntityGeneratorSchema } from './schema';
import { join } from 'path';
import { FileNameBuilder, getClassBuilder } from '@webpackages/meta-printer';

export async function entityGenerator(
  tree: Tree,
  options: EntityGeneratorSchema
) {
  const projectRoot = `libs/gen-entity/src/lib/${options.name}`;

  const classBuilder = getClassBuilder({
    modelName: names(options.name).className,
    properties: {
      name: { type: 'string' },
    },
    relations: {
      category: {
        relationType: 'Many',
        model: {
          modelName: 'Category',
          properties: { name: { type: 'string' } },
        },
      },
    },
  });

  const fileNameBuilder = new FileNameBuilder(options.name);
  generateFiles(tree, join(__dirname, 'files'), projectRoot, {
    fileName: fileNameBuilder.Entity(),
    content: classBuilder.Entity().print(),
  });
  await formatFiles(tree);
}

export default entityGenerator;
