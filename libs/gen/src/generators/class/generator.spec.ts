import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { classGenerator } from './generator';
import { ClassGeneratorSchema } from './schema';

describe('class generator', () => {
  let tree: Tree;
  const options: ClassGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await classGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
