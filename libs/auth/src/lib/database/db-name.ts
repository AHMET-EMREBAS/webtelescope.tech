import { join } from 'path';

export function createDatabaseName(organizationName: string) {
  return join(__dirname, 'database', `auth-${organizationName}.sqlite`);
}
