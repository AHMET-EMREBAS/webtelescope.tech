import { Model } from '../meta';
import {
  IDecorate,
  IExtend,
  IImplement,
  IImport,
  IName,
  IPrint,
  IType,
} from './__common';

export class ModelPrinter
  implements IPrint, IDecorate, IName, IImport, IType, IImplement, IExtend
{
  constructor(private readonly model: Model) {}
  viewName(modelName: string): string {
    throw new Error('Method not implemented.');
  }
  importing(): string {
    return '';
  }
  type(): string {
    return '';
  }

  decorators(): string {
    return '';
  }
  name(): string {
    return this.model.modelName;
  }

  implements(): string {
    return '';
  }
  extendings(): string {
    return '';
  }

  print(): string {
    return '';
  }
}
