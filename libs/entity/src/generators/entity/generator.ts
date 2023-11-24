import { formatFiles, generateFiles, Tree, names } from '@nx/devkit';
import * as path from 'path';
import { EntityGeneratorSchema } from './schema';

export async function entityGenerator(
  tree: Tree,
  options: EntityGeneratorSchema
) {
  const TARGET = `./libs/${options.project}/src/lib/resources`;

  generateFiles(tree, path.join(__dirname, 'files'), TARGET, {
    ...names(options.name),
  });
  await formatFiles(tree);
}

export default entityGenerator;
