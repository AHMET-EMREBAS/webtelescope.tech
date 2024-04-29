import { names } from '@webpackages/utils';

export interface IPackageNames {
  /**
   * Used for interfaces, types
   */
  common(): string;

  /**
   * Used for server side code
   */
  core(): string;

  /**
   * Resolve model name to the path '../${model-name}';
   */
  sibling(modelName: string): string;
}

export class PackageNames implements IPackageNames {
  common(): string {
    return '@webpackages/common';
  }

  core(): string {
    return '@webpackages/core';
  }

  sibling(modelName: string): string {
    return `../${names(modelName).fileName}`;
  }
}
