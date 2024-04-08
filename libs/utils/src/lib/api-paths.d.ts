export type ApiPaths = {
    ID_KEY: string;
    RELATION_ID_KEY: string;
    RELATION_NAME_KEY: string;
    SINGULAR_PATH: string;
    PLURAL_PATH: string;
    BY_ID_PATH: string;
    RELATION_NAME_PATH: string;
    RELATION_NAME_AND_ID_PATH: string;
    COUNT_PATH: string;
};
export declare enum ApiPathKeys {
    AUTH_TOKEN = "authToken",
    ID_KEY = "id",
    RELATION_ID_KEY = "relationId",
    RELATION_NAME_KEY = "relationName"
}
/**
 * Create the api end points from resource name
 *````typescript
 * ID_KEY = 'id'
 * RELATION_ID_KEY = 'relationId'
 * RELATION_NAME_KEY = 'relationName'
 * SINGULAR_PATH = 'category'
 * PLURAL_PATH = 'categories'
 * BY_ID_PATH = 'category/:id'
 * RELATION_NAME_PATH = 'category/:id/:relationName'
 * RELATION_NAME_AND_ID_PATH = 'category/:id/:relationName/:relationId'````
 * @param resourceName
 * @returns
 */
export declare function getApiPaths(resourceName: string): ApiPaths;
