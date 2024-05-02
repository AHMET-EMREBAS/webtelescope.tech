import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import * as path from 'path';
import * as MetaData from '@webpackages/gen-meta';
import { Model } from '@webpackages/meta';

const modelNames = Object.entries(
  MetaData as unknown as Record<string, Model>
).map(([, value]) => {
  return value.modelName;
});

function __gen(tree: Tree) {
  for (const modelName of modelNames) {
    const projectRoot = `libs/gen-rest/src/lib/${names(modelName).fileName}`;

    generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
      ...names(modelName),
    });
  }
}

export async function resourceGenerator(tree: Tree) {
  __gen(tree);
  await formatFiles(tree);
}

export default resourceGenerator;
