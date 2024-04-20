import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { ClientGeneratorSchema } from './schema';

export async function clientGenerator(
  tree: Tree,
  options: ClientGeneratorSchema
) {
  const projectRoot = `apps`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...options,
    ...names(options.name),
  });
  await formatFiles(tree);
}

export default clientGenerator;
