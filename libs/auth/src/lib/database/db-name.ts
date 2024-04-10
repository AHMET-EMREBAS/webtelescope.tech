import { join } from 'path';

/**
 * auth-{orgname}.sqlite
 * @param orgname
 * @returns
 */
export function getDatabaseName(orgname: string) {
  return join(__dirname, 'database', orgname, orgname);
}

export function getDatabaseDirectory(orgname: string) {
  return join(__dirname, 'database', orgname);
}

export function getTemplateDatabaseName() {
  return join(__dirname, 'database', 'templates', 'template');
}
