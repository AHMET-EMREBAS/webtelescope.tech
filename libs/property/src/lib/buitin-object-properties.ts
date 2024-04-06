import { Exclude } from 'class-transformer';
import { NumberProperty } from './builtin-properties';
import { ApiPropertyOptions, Property } from './property';

export function Dto() {
  return Exclude();
}

@Dto()
export class ObjectIDDto {
  @NumberProperty()
  id!: number;
}

export function ObjectProperty(
  options: Partial<Omit<ApiPropertyOptions, 'type'>> = {}
) {
  return Property({
    type: 'object',
    required: true,
    description: 'Object property',
    ...options,
  });
}

/**
 * Object ID Property. Object type is {@link ObjectIDDto}
 * @param options
 */
export function ObjectIdProperty(
  options: Partial<Omit<ApiPropertyOptions, 'type' | 'objectType'>> = {}
) {
  return ObjectProperty({
    objectType: ObjectIDDto,
    description: 'Object id property',
    example: { id: 1 },
    ...options,
  });
}
