import { Model, ModelManager, RelationType } from '@webpackages/meta';
import { ImportsBuilder } from './imports-builder';
describe('ImportBuilder', () => {
  it('should print imports', () => {
    const model: Model = {
      modelName: 'Home',
      relations: {
        cat: {
          type: RelationType.Many,
          model: {
            modelName: 'Cat',
          },
        },
        yello: {
          type: RelationType.Many,
          model: {
            modelName: 'Cat',
          },
        },
      },
    };

    const manager = new ModelManager(model);
    const imp = new ImportsBuilder(manager).Entity().print();

    console.log(imp);
  });
});
