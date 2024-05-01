// import { IPrint } from '@webpackages/printer';
// import { ICoverAllClassTypes } from '../common';
// import { ModelManager } from '@webpackages/meta';
// import { PropertyBuilder } from '../property';

// export class ClassPropertiesBuilder implements ICoverAllClassTypes<IPrint> {
//   constructor(protected readonly modelManager: ModelManager) {}

//   Entity(): IPrint {
//     return this.modelManager.propertiesList().map((e) => {
//       return new PropertyBuilder(this.modelManager.modelName(),e.propertyName!,)
//     });
//     throw new Error('Method not implemented.');
//   }
//   View(): IPrint {
//     throw new Error('Method not implemented.');
//   }
//   Create(): IPrint {
//     throw new Error('Method not implemented.');
//   }
//   Update(): IPrint {
//     throw new Error('Method not implemented.');
//   }
//   Query(): IPrint {
//     throw new Error('Method not implemented.');
//   }
//   IEntity(): IPrint {
//     throw new Error('Method not implemented.');
//   }
//   IView(): IPrint {
//     throw new Error('Method not implemented.');
//   }
//   ICreate(): IPrint {
//     throw new Error('Method not implemented.');
//   }
//   IUpdate(): IPrint {
//     throw new Error('Method not implemented.');
//   }
//   IQuery(): IPrint {
//     throw new Error('Method not implemented.');
//   }
// }
