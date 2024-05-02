import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import * as path from 'path';
import * as MetaData from '@webpackages/gen-meta';
import { Model, ModelManager } from '@webpackages/meta';

const modelNames = Object.entries(
  MetaData as unknown as Record<string, Model>
).map(([, value]) => {
  return new ModelManager(value);
});

function __gen(tree: Tree) {
  for (const manager of modelNames) {
    const modelName = manager.modelName();
    const projectRoot = `libs/material/services/src/lib/ngrx`;
    generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
      ...names(modelName),
    });
  }
}

export async function ngrxGenerator(tree: Tree) {
  __gen(tree);
  await formatFiles(tree);
}

export default ngrxGenerator;
