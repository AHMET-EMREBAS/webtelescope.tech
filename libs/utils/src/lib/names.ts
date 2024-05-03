/**
 * Convert className like ClassName to Class_Name
 * @param className
 * @returns
 */
export function splitByUppercase(className: string) {
  const result = [className[0]];
  const asList = className.split('').slice(1);

  for (const v of asList) {
    if (v.charCodeAt(0) <= 90 && v.charCodeAt(0) >= 65) {
      result.push('_');
    }
    result.push(v);
  }
  return result.join('');
}

function uppercaseFirst(name: string) {
  if (name) return name && [name[0].toUpperCase(), name.slice(1)].join('');

  return '';
}

function lowercaseFirst(name: string) {
  if (name) return [name[0].toLowerCase(), name.slice(1)].join('');

  return '';
}

function __className(name: string) {
  return name
    .split('-')
    .map((e) => uppercaseFirst(e))
    .join('');
}

function __propertyName(name: string) {
  return lowercaseFirst(
    name
      .split('-')
      .map((e) => uppercaseFirst(e))
      .join('')
  );
}

function __constName(name: string) {
  return splitByUppercase(name)
    .split('_')
    .map((e) => e.toUpperCase())
    .join('_')
    .split('-')
    .join('_');
}

function __fileName(name: string) {
  return splitByUppercase(name)
    .split('_')
    .map((e) => e.toLowerCase())
    .join('-');
}

function __titleName(name: string) {
  return splitByUppercase(name)
    .split('_')
    .map((e) => uppercaseFirst(e))
    .join(' ');
}

export function names(name: string) {
  return {
    className: __className(name),
    fileName: __fileName(name),
    propertyName: __propertyName(name),
    constName: __constName(name),
    titleName: __titleName(name),
  };
}

export function toPropertyName(...items: (string | undefined)[]) {
  return names(
    (items as string[])
      .filter((e) => e)
      .map(names)
      .map((e) => e.className)
      .join('')
  ).propertyName;
}
