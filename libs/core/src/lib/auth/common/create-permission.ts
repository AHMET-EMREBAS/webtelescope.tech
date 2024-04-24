export enum ResourceAction {
  READ = 'READ',
  WRITE = 'WRITE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  MANAGE = 'MANAGE',
}

export function createPermissionName(
  resourceName: string,
  action: ResourceAction
): string {
  return `${action}:${resourceName}`;
}

export function writePermissionName(resouceName: string) {return createPermissionName(resouceName, ResourceAction.WRITE)}
export function readPermissionName(resouceName: string) {return createPermissionName(resouceName, ResourceAction.READ)}
export function updatePermissionName(resouceName: string) {return createPermissionName(resouceName, ResourceAction.UPDATE)}
export function deletePermissionName(resouceName: string) {return createPermissionName(resouceName, ResourceAction.DELETE)}
export function managePermissionName(resouceName: string) {return createPermissionName(resouceName, ResourceAction.MANAGE)}
