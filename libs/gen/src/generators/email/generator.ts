import { generateFiles, Tree } from '@nx/devkit';

import { EmailGeneratorSchema } from './schema';
import { join } from 'path';

export async function emailGenerator(
  tree: Tree,
  options: EmailGeneratorSchema
) {
  const projectRoot = `apps/${options.project}/src`;

  generateFiles(tree, join(__dirname, 'files'), projectRoot, options);
}

export default emailGenerator;
