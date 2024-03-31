import { ICreatePermissionDto } from '@webpackages/model';
import { Dto, NameProperty } from '@webpackages/property';

/**
 * @param permission string
 */
@Dto()
export class CreatePermissionDto implements ICreatePermissionDto {
  @NameProperty() permission!: string;
}
