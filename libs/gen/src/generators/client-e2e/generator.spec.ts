import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { clientE2eGenerator } from './generator';
import { ClientE2eGeneratorSchema } from './schema';

describe('client-e2e generator', () => {
  let tree: Tree;
  const options: ClientE2eGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await clientE2eGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
