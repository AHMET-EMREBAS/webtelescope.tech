import { formatFiles, generateFiles, Tree, names } from '@nx/devkit';
import * as path from 'path';
import { EntityGeneratorSchema } from './schema';

export async function entityGenerator(
  tree: Tree,
  options: EntityGeneratorSchema
) {
  const projectRoot = `libs/${options.project}/src/lib`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...names(options.name),
    template: '',
  });
  await formatFiles(tree);
}

export default entityGenerator;
