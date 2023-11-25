import { plural } from "../string/plural";

export type ApiPaths = {
  ID_KEY: string;
  RELATION_ID_KEY: string;
  RELATION_NAME_KEY: string;
  SINGULAR_PATH: string;
  PLURAL_PATH: string;
  BY_ID_PATH: string;
  RELATION_NAME_PATH: string;
  RELATION_NAME_AND_ID_PATH: string;
};

export enum ApiConstants {
  AUTH_TOKEN = 'authToken',
  ID_KEY = 'id',
  RELATION_ID_KEY = 'relationId',
  RELATION_NAME_KEY = 'relationName',
}
/**
 * Create the api end points from resource name
 * ID_KEY = 'id'
 * RELATION_ID_KEY = 'relationId'
 * RELATION_NAME_KEY = 'relationName'
 * SINGULAR_PATH = 'category'
 * PLURAL_PATH = 'categories'
 * BY_ID_PATH = 'category/:id'
 * RELATION_NAME_PATH = 'category/:id/:relationName'
 * RELATION_NAME_AND_ID_PATH = 'category/:id/:relationName/:relationId'
 * @param resourceName
 * @returns
 */
export function getApiPaths(resourceName: string): ApiPaths {
  const ID_KEY = ApiConstants.ID_KEY;
  const RELATION_ID_KEY = ApiConstants.RELATION_ID_KEY;
  const RELATION_NAME_KEY = ApiConstants.RELATION_NAME_KEY;

  const SINGULAR_PATH = resourceName.toLowerCase();
  const PLURAL_PATH = plural(SINGULAR_PATH);
  const BY_ID_PATH = `${SINGULAR_PATH}/:${ID_KEY}`;
  const RELATION_NAME_PATH = `${SINGULAR_PATH}/:${ID_KEY}/:${RELATION_NAME_KEY}`;
  const RELATION_NAME_AND_ID_PATH = `${RELATION_NAME_PATH}/:${RELATION_ID_KEY}`;

  return {
    ID_KEY,
    RELATION_ID_KEY,
    RELATION_NAME_KEY,
    SINGULAR_PATH,
    PLURAL_PATH,
    BY_ID_PATH,
    RELATION_NAME_PATH,
    RELATION_NAME_AND_ID_PATH,
  };
}
