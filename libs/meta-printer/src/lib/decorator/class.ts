import { ModelManager, RelationOptions } from '@webpackages/meta';
import { DecoratorPrinter, IPrint } from '@webpackages/printer';
import { DecoratorName, EmptyPrinter } from '../common-imp';
import { ICoverAllClassTypes } from '../common';
import { names } from '@webpackages/utils';

/**
 * Provides class decorators
 */
export class ClassDecoratorBuilder implements ICoverAllClassTypes<IPrint> {
  constructor(protected readonly modelManager: ModelManager) {}

  Entity(): IPrint {
    return new DecoratorPrinter({ name: DecoratorName.Entity });
  }
  View(): IPrint {
    const { className: main, propertyName: alias } = names(
      this.modelManager.modelName()
    );

    const m = (m: RelationOptions) => names(m.model.modelName).className;
    const p = (m: RelationOptions) => names(m.model.modelName).propertyName;
    const comp = (v: RelationOptions) => `${p(v)}.id = ${alias}.${p(v)}Id`;
    const cn = (value: string) => names(value).className;
    return new DecoratorPrinter({
      name: DecoratorName.ViewEntity,
      optionsString: `{
        expression(ds) {
          return ds
            .createQueryBuilder()
            .select('${alias}.id', '${alias}Id')
            ${this.modelManager
              .propertiesList()
              .filter((e) => e.searchable != false)
              .map((e) => {
                return `.addSelect('${alias}.${e.name}', '${e.name}')`;
              })
              .join('\n')}
              
            ${this.modelManager
              .relationsList()
              .map((e) => {
                // .leftJoin('user_roles_role', 'roles', 'roles.userId = user.id')
                // .leftJoin(Role, 'role', 'role.id = roles.roleId');
                // -----------------------
                // .leftJoin('x_ys_y', 'ys', 'ys.xId = x.id')
                // .leftJoin(Y, 'y', 'y.id = ys.yId');
                const smm = new ModelManager(e.model);
                return smm
                  .propertiesList()
                  .filter((e) => e.searchable != false)
                  .map((z) => {
                    return `.addSelect('${p(e)}.${z.name}', '${p(e)}${cn(
                      z.name!
                    )}')`;
                  })
                  .join('\n');
              })
              .join('\n')}
                .from(${main}, '${alias}')
            ${this.modelManager
              .relationsList()
              .map((e) => {
                if (e.relationType != 'Many') {
                  return `.leftJoin(${m(e)}, '${p(e)}', '${comp(e)}')`;
                } else {
                  return [
                    `.leftJoin('${alias}_${p(e)}s_${p(e)}', '${p(e)}s', '${p(
                      e
                    )}s.${alias}Id = ${alias}.id' )`,
                    `.leftJoin(${m(e)}, '${p(e)}', '${p(e)}s.${p(e)}Id = ${p(
                      e
                    )}.id')`,
                  ].join('\n');
                }
              })
              .join('\n')};
        },

      }`,
    });
  }
  Create(): IPrint {
    return new DecoratorPrinter({ name: DecoratorName.Dto });
  }
  Update(): IPrint {
    return new DecoratorPrinter({ name: DecoratorName.Dto });
  }
  Query(): IPrint {
    return new DecoratorPrinter({ name: DecoratorName.Dto });
  }

  /**
   * Interfaces does not have decorators
   */
  IEntity(): IPrint {
    return EmptyPrinter;
  }
  /**
   * Interfaces does not have decorators
   */
  IView(): IPrint {
    return EmptyPrinter;
  }
  /**
   * Interfaces does not have decorators
   */
  ICreate(): IPrint {
    return EmptyPrinter;
  }
  /**
   * Interfaces does not have decorators
   */
  IUpdate(): IPrint {
    return EmptyPrinter;
  }
  /**
   * Interfaces does not have decorators
   */
  IQuery(): IPrint {
    return EmptyPrinter;
  }
}
