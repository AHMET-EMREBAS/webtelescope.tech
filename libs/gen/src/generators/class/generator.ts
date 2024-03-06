import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import * as path from 'path';
import { ClassGeneratorSchema } from './schema';

export async function classGenerator(
  tree: Tree,
  options: ClassGeneratorSchema
) {
  const { name, project } = options;
  const projectRoot = `libs/${project}/src/lib`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    content: 'Hello there',
    ...names(name),
  });
  await formatFiles(tree);
}

export default classGenerator;
