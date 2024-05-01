import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { EntityGeneratorSchema } from './schema';
import { join } from 'path';

export async function entityGenerator(
  tree: Tree,
  options: EntityGeneratorSchema
) {
  const projectRoot = `libs/entities/src/lib/${options.name}`;

  generateFiles(tree, join(__dirname, 'files'), projectRoot, {
    ...names(options.name),
  });
  await formatFiles(tree);
}

export default entityGenerator;
