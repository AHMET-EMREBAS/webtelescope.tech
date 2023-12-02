import { formatFiles, generateFiles, Tree, names } from '@nx/devkit';
import * as path from 'path';
import { ClientResourceGeneratorSchema } from './schema';

export async function clientResourceGenerator(
  tree: Tree,
  options: ClientResourceGeneratorSchema
) {
  const projectRoot = `libs/${options.project}/src/lib`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...names(options.name),
  });
  await formatFiles(tree);
}

export default clientResourceGenerator;
