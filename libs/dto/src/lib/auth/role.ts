import { ICreateRoleDto, IID } from '@webpackages/model';
import { Dto, NameProperty, ObjectIdProperty } from '@webpackages/property';

/**
 * @param role string
 * @param permissions {@link IID }[ ]
 */
@Dto()
export class CreateRoleDto implements ICreateRoleDto {
  @NameProperty() role!: string;
  @ObjectIdProperty({ isArray: true }) permissions!: IID[];
}
