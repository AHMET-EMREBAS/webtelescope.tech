export interface IPackageNameProvider {
  /**
   * Used for interfaces, types
   */
  common(): string;

  /**
   * Used for server side code
   */
  core(): string;

  /**
   * Utility package name
   */
  utils(): string;
}

/**
 * Provides the commonly used pacakge name such as core, common, utils
 */
export class PackageNameProvider implements IPackageNameProvider {
  common(): string {
    return '@webpackages/common';
  }

  utils(): string {
    return `@webpackages/utils`;
  }
  core(): string {
    return '@webpackages/core';
  }
}
