import { join } from 'path';

/**
 * auth-{orgname}.sqlite
 * @param organizationName
 * @returns
 */
export function getDatabaseName(organizationName: string) {
  return join(
    __dirname,
    'database',
    organizationName,
    `${organizationName}.sqlite`
  );
}

export function getTemplateDatabaseName() {
  return join(__dirname, 'database', '_templates', 'template.sqlite');
}
