import { CommonPropertyOptions } from './common-options';
import { Dto } from './dto';
import { PositiveIntegerProperty } from './number';
import { ObjectProperty } from './object';

@Dto()
export class ObjectIdDto {
  @PositiveIntegerProperty()
  id!: number;
}

export type ObjectIdPropertyOptions = Pick<
  CommonPropertyOptions,
  'isArray' | 'required'
>;

/**
 *
 * @param options {@link ObjectIdPropertyOptions} ````{ required: true }```` by default
 * @returns
 */
export function ObjectIdProperty(
  options: ObjectIdPropertyOptions = { required: true }
) {
  return ObjectProperty({
    objectType: ObjectIdDto,
    ...options,
  });
}
