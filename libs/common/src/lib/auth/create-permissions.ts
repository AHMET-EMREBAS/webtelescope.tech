
export function createReadPermission(resourceName: string) {
  return `${resourceName}.read`;
}

export function createWritePermission(resourceName: string) {
  return `${resourceName}.write`;
}

export function createReadOwnPermission(resourceName: string) {
  return `${resourceName}.read.own`;
}

export function createWriteOwnPermission(resourceName: string) {
  return `${resourceName}.write.own`;
}



