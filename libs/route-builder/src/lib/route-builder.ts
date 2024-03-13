export enum ParamNames {
  ID = 'id',
  RELATION_ID = 'rid',
  RELATION_NAME = 'rn',
  SUBSCRIBE = 'subscribe',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  META = 'meta',
  COUNT = 'count',
}
export enum ParamDefinations {
  ID = `:${ParamNames.ID}`,
  RELATION_ID = `:${ParamNames.RELATION_ID}`,
  RELATION_NAME = `:${ParamNames.RELATION_NAME}`,
}

export function joinURLFragments(...args: string[]) {
  return args.join('/');
}

export class RouteBuilder {
  private readonly SINGULAR_ID_PATH = joinURLFragments(
    this.singularName,
    ParamDefinations.ID
  );

  /**
   * Used with POST request to save an entity
   */
  readonly CREATE = this.singularName;

  /**
   * Used with GET request to query all entities.
   */
  readonly FIND_ALL = this.pluralName;

  /**
   * Used with GET request to find entity by id.
   */
  readonly FIND_ONE_BY_ID = this.SINGULAR_ID_PATH;

  /**
   * Used with PUT request to update entity by id.
   */
  readonly UPDATE_ONE_BY_ID = this.SINGULAR_ID_PATH;

  /**
   * Used with DELETE request to delete entity by id.
   */
  readonly DELETE_ONE_BY_ID = this.SINGULAR_ID_PATH;

  /**
   * Used with PUT request to add relation value (many-to-many) to the entity by id, relationName, and relationId
   */
  readonly GENERIC_ADD_RELATION = joinURLFragments(
    this.singularName,
    ParamDefinations.ID,
    ParamDefinations.RELATION_NAME,
    ParamDefinations.RELATION_ID
  );

  /**
   * Used with DELETE request to remove relation value (many-to-many) from the entity by id, relationName, and relationId.
   */
  readonly GENERIC_REMOVE_RELATION = this.GENERIC_ADD_RELATION;

  /**
   * USed with POST request to set relation value (one-to-one|many-to-one) to the entity by id, relationName, and relationId.
   */
  readonly GENERIC_SET_RELATION = this.GENERIC_ADD_RELATION;

  /**
   * USed with DELETE request to unset relation value (one-to-one|many-to-one) from the entity by id, relationName
   */
  readonly GENERIC_UNSET_RELATION = joinURLFragments(
    this.singularName,
    ParamDefinations.ID,
    ParamDefinations.RELATION_NAME
  );

  /**
   * Used with GET request to count the entities by provided query
   */
  readonly COUNT = joinURLFragments(
    this.singularName,
    ParamNames.META,
    ParamNames.COUNT
  );

  /**
   * Subscribe create events
   */
  readonly SUBSCRIBE_CREATE = joinURLFragments(
    this.singularName,
    ParamNames.SUBSCRIBE,
    ParamNames.CREATE
  );

  /**
   * Subscribe update events
   */
  readonly SUBSCRIBE_UPDATE = joinURLFragments(
    this.singularName,
    ParamNames.SUBSCRIBE,
    ParamNames.UPDATE
  );

  /**
   * Subscribe delete events
   */
  readonly SUBSCRIBE_DELETE = joinURLFragments(
    this.singularName,
    ParamNames.SUBSCRIBE,
    ParamNames.DELETE
  );

  /**
   * Find relation/relations value by id and relation name
   * @param relationRoute
   * @returns
   */
  FIND_RELATION(relationRoute: RouteBuilder) {
    return joinURLFragments(
      this.singularName,
      ParamDefinations.ID,
      relationRoute.singularName
    );
  }

  /**
   * Hard version of generic add-relation route
   * @param relationRoute
   * @returns
   */
  ADD_RELATION(relationRoute: RouteBuilder) {
    return joinURLFragments(
      this.singularName,
      ParamDefinations.ID,
      relationRoute.singularName,
      ParamDefinations.RELATION_ID
    );
  }

  /**
   * Hard version of remvoe-relation route.
   * @param relationRoute
   * @returns
   */
  REMOVE_RELATION(relationRoute: RouteBuilder) {
    return this.ADD_RELATION(relationRoute);
  }

  /**
   * Hard version of set-relation route.
   * @param relationRoute
   * @returns
   */
  SET_RELATION(relationRoute: RouteBuilder) {
    return this.ADD_RELATION(relationRoute);
  }

  /**
   * Hard version of unset-relation route
   * @param relationRoute
   * @returns
   */
  UNSET_RELATION(relationRoute: RouteBuilder) {
    return joinURLFragments(
      this.singularName,
      ParamDefinations.ID,
      relationRoute.singularName
    );
  }

  /**
   * Singular and plural routes should be snake-case
   * @param singularName Singular route
   * @param pluralName Plural route
   */
  constructor(
    public readonly singularName: string,
    public readonly pluralName: string
  ) {}
}
