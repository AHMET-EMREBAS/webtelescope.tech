import { Tree } from '@nx/devkit';
import { TemplateGeneratorSchema } from './schema';

export async function templateGenerator(
  tree: Tree,
  options: TemplateGeneratorSchema
) {
  const { source, placeholder } = options;

  console.table({ source, placeholder });
}

export default templateGenerator;
