import { ImportPrinter } from '@webpackages/printer';
import { IPackageNames } from './package-names';

export class CoreImportPrinter extends ImportPrinter {
  constructor(packageNames: IPackageNames, items: string[]) {
    super({
      source: packageNames.core(),
      items,
    });
  }
}
export class CommonImportPrinter extends ImportPrinter {
  constructor(packageNames: IPackageNames, items: string[]) {
    super({
      source: packageNames.core(),
      items,
    });
  }
}

export class SiblingImportPrinter extends ImportPrinter {
  constructor(item: string, fileNameBuilder:FileNameBuilder) {
    super({
      source: `./${}`,
    });
  }
}

export class ParentSiblingImportPrinter extends ImportPrinter {
  constructor(packageNames: IPackageNames, items: string[]) {
    super({
      source: packageNames.core(),
      items,
    });
  }
}
