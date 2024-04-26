import { Model } from '../__meta';
import { IPrint } from '../__printer';

/**
 * {
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('u.id', 'id')
      .addSelect('u.username', 'username')
      .addSelect('u.password', 'password')
      .addSelect('u.createdAt', 'createdAt')
      .addSelect('u.updatedAt', 'updatedAt')
      .addSelect('u.deletedAt', 'deletedAt')
      .addSelect('GROUP_CONCAT(ur.permissions)', 'permissions')
      .addSelect('GROUP_CONCAT(ur.roles)', 'roles')
      .addSelect('GROUP_CONCAT(us.scopes)', 'scopes')
      .from(User, 'u')
      .leftJoin(UserRoleView, 'ur', 'ur.id = u.id')
      .leftJoin(UserScopeView, 'us', 'us.id = u.id')
      .groupBy('u.id');
  },
}
 */




export class ViewEntityDecoratorOptionsPrinter implements IPrint {
  private readonly mainAlias = 'main';
  constructor(protected readonly model: Model) {}

  protected select(
    entityAlias: string,
    propertyName: string,
    propertyAlias: string
  ) {
    return `select('${entityAlias}.${propertyName}','${propertyAlias}')`;
  }

  protected addSelect(
    entityAlias: string,
    propertyName: string,
    propertyAlias: string
  ) {
    return `addSelect('${entityAlias}.${propertyName}','${propertyAlias}')`;
  }

  print(): string {
    return `{ 
      expression(ds) {
        return ds
          .createQueryBuilder()
          .select('main.id', 'id')
          .groupBy('main.id')
    }`;
  }
}
