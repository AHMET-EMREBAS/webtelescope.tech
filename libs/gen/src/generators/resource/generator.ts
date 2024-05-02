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
    const N = names(modelName);
    const projectRoot = `libs/gen-rest/src/lib/${N.fileName}`;

    const relations = manager.uniqueRelationNames();

    const relationEntitiesAndViews = [...relations, `${N.className}View`]
      .filter((e) => e.trim().length > 0)
      .join(',');
    generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
      ...names(modelName),
      relationEntitiesAndViews,
      relationImports: `import { ${relationEntitiesAndViews} } from '@webpackages/gen-entity';`,
    });
  }
}

export async function resourceGenerator(tree: Tree) {
  __gen(tree);
  await formatFiles(tree);
}

export default resourceGenerator;
