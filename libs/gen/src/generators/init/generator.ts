import { formatFiles, Tree } from '@nx/devkit';
import { execSync } from 'child_process';
import { InitGeneratorSchema } from './schema';

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  const prefix = options.prefix ? options.prefix + '-' : '';
  const importPrefix = options.companyName || '';

  const libs = ['entity', 'rest', 'graph', 'common'];

  for (const lib of libs) {
    const packageName = prefix + lib;
    const importPath = `@${importPrefix}/${packageName}`;

    execSync(
      `npx nx g @nx/js:lib ${packageName} --publishable --unitTestRunner=jest --bundler=swc --importPath=${importPath}`
    );
  }

  await formatFiles(tree);
}

export default initGenerator;
