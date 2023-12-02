import { formatFiles, generateFiles, Tree, names } from '@nx/devkit';
import * as path from 'path';
import { ControllerGeneratorSchema } from './schema';

export async function controllerGenerator(
  tree: Tree,
  options: ControllerGeneratorSchema
) {
  const projectRoot = `libs/${options.project}/src/lib/resources`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...names(options.name),
  });
  await formatFiles(tree);
}

export default controllerGenerator;
