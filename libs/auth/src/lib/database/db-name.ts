import { join } from 'path';

/**
 * auth-{orgname}.sqlite
 * @param orgname
 * @returns
 */
export function getDatabaseName(orgname: string) {
  return join(__dirname, 'database', orgname, `${orgname}.sqlite`);
}

export function getAppDatabaseName(orgname: string, appName: string) {
  return join(__dirname, 'database', orgname, `${appName}.sqlite`);
}

export function getDatabaseDirectory(orgname: string) {
  return join(__dirname, 'database', orgname);
}

export function getTemplateDatabaseName() {
  return join(__dirname, 'database', '__templates', 'template.sqlite');
}
