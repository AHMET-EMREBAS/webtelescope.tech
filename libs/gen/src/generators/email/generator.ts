import { Tree, formatFiles } from '@nx/devkit';

import { EmailGeneratorSchema } from './schema';
import { join } from 'path';
import { cp } from 'fs/promises';
import { cwd } from 'process';

export async function emailGenerator(
  tree: Tree,
  options: EmailGeneratorSchema
) {
  const projectRoot = join(cwd(), `apps/${options.project}/src`);

  await cp(join(__dirname, 'files'), projectRoot, { recursive: true });
  formatFiles(tree);
}

export default emailGenerator;
