export function validateDatabaseName(name: string) {
  if (name.replace('-', 'QQAAWWRR').match(/\W/))
    throw new Error('Special characters are not allowed but dash(-).');

  if (name.match(/[A-Z]/))
    throw new Error('Uppercase characters are not allowed!');

  if (name.length > 30) throw new Error('Not more than 30 chars');
  if (name.length < 4) throw new Error('Not less than 6 chars');
}

export function valdiateDatabaseNameForClient(name: string) {
  const forbidden: string[] = [
    'admin',
    'main',
    'root',
    'project',
    'website',
    'web',
    'administrator',
    'administrative',
    'language',
  ];
  if (forbidden.includes(name.toLowerCase()))
    throw new Error(`${name} is forbidden!`);

  validateDatabaseName(name);
}
