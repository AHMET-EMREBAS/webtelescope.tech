import { Model } from '../meta';
import {
  IDecorate,
  IExtend,
  IImplement,
  IImport,
  IName,
  IPrint,
} from './__common';

export class ModelPrinter
  implements
    IPrint,
    IDecorate,
    Pick<IName, 'name'>,
    IImport,
    IImplement,
    IExtend
{
  constructor(private readonly model: Model) {}

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
