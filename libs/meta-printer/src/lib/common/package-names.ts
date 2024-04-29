export interface IPackageNames {
  /**
   * Used for interfaces, types
   */
  common(): string;

  /**
   * Used for server side code
   */
  core(): string;
}

export class PackageNames implements IPackageNames {
  common(): string {
    return '@webpackages/common';
  }

  core(): string {
    return '@webpackages/core';
  }
}
