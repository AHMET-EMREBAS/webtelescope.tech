import { Tree, formatFiles, moveFilesToNewDirectory } from '@nx/devkit';

import { EmailGeneratorSchema } from './schema';
import { join } from 'path';

export async function emailGenerator(
  tree: Tree,
  options: EmailGeneratorSchema
) {
  console.log(options);
  const projectRoot = `apps/${options.project}/src/app`;

  moveFilesToNewDirectory(tree, join(__dirname, 'files', 'app'), projectRoot);
  formatFiles(tree);
}

export default emailGenerator;
