import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';

import { InitGeneratorSchema } from './schema';
import { join } from 'path';
import { setSSOTDirectoryName } from '../common';

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  const { name } = options;

  setSSOTDirectoryName(name);

  generateFiles(tree, join(__dirname, 'files'), name, { ...names(name) });

  await formatFiles(tree);
}

export default initGenerator;
