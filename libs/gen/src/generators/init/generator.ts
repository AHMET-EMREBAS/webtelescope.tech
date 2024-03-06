import { formatFiles, generateFiles, Tree } from '@nx/devkit';

import { InitGeneratorSchema } from './schema';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  const { name } = options;

  const pacakgeJSON = readFileSync('./package.json').toString();

  const packageJSONObject = JSON.parse(pacakgeJSON);

  packageJSONObject['webpacakgesGeneratorName'] = name;

  const newJSONText = JSON.stringify(packageJSONObject);

  writeFileSync('./package.json', newJSONText, 'utf-8');

  generateFiles(tree, join(__dirname, 'files'), name, {});

  await formatFiles(tree);
}

export default initGenerator;
