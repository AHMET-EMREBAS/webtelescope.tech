import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { ClientE2eGeneratorSchema } from './schema';

export async function clientE2eGenerator(
  tree: Tree,
  options: ClientE2eGeneratorSchema
) {
  const projectRoot = `apps`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...names(options.name),
  });
  await formatFiles(tree);
}

export default clientE2eGenerator;
