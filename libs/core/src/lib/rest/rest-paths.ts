import { ResourceMetadata } from './resource-metadata';

export class RestPaths {
  constructor(protected readonly options: Readonly<ResourceMetadata>) {}
  readonly FIND_ONE_BY_ID = `${this.options.singularPath}/:id`;
  readonly FIND_ALL = `${this.options.pluralPath}`;
  readonly SAVE_ONE = this.options.singularPath;
  readonly SAVE_MANY = this.options.pluralPath;
  readonly UPDATE_ONE = this.options.singularPath + '/:id';
  readonly UPDATE_MANY = this.options.pluralPath;
  readonly DELETE_ONE = this.options.singularPath + '/:id';
  readonly DELETE_MANY = this.options.pluralPath;
  readonly ADD_RELATION = this.options.singularPath + '/:id' + '/:rn' + '/:rid';
  readonly REMOVE_RELATION = this.ADD_RELATION;
  readonly SET_RELATION = this.options.singularPath + '/:id' + '/:rn' + '/:rid';
  readonly UNSET_RELATION = this.options.singularPath + '/:id' + '/:rn';

  readonly COUNT = this.options.singularPath + '/meta' + '/count';
}
