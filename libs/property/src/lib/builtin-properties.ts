import { ApiPropertyOptions, Property } from './property';

/**
 * Required string property
 * @param options
 * @returns
 */
export function StringProperty(
  options: Partial<Omit<ApiPropertyOptions, 'type'>> = {}
) {
  return Property({
    type: 'string',
    description: 'String property',
    example: 'string value',
    ...options,
  });
}

/**
 * Required name property
 * @param options
 * @returns
 */
export function NameProperty(
  options: Partial<
    Omit<ApiPropertyOptions, 'type' | 'minLength' | 'maxLength'>
  > = {}
) {
  return StringProperty({
    minLength: 3,
    maxLength: 30,
    description: 'Name property',
    example: 'name',
    ...options,
  });
}

/**
 * Required JWT Proeprty
 * @param options
 * @returns
 */
export function JwtProperty(
  options: Partial<Omit<ApiPropertyOptions, 'type'>> = {}
) {
  return StringProperty({
    specialFormat: 'jwt',
    description: 'JSON web token property',
    example: 'json web token',
    ...options,
  });
}

/**
 * Required UUID 4 property
 * @param options
 * @returns
 */
export function UUID4Property(
  options: Partial<Omit<ApiPropertyOptions, 'type'>> = {}
) {
  return StringProperty({
    specialFormat: 'uuid',
    description: 'UUID 4 Property',
    example: 'UUID 4 value',
    ...options,
  });
}

/**
 * Required email property
 * @param options
 * @returns
 */
export function EmailProperty(
  options: Partial<
    Omit<ApiPropertyOptions, 'type' | 'format' | 'specialFormat'>
  > = {}
) {
  return StringProperty({
    format: 'email',
    specialFormat: 'email',
    example: 'root@webtelescope.tech',
    ...options,
  });
}

/**
 * Required password property
 * @param options
 * @returns
 */
export function PasswordProperty(
  options: Partial<
    Omit<ApiPropertyOptions, 'type' | 'format' | 'specialFormat'>
  > = {}
) {
  return StringProperty({
    format: 'password',
    specialFormat: 'password',
    example: '!Password123.',
    ...options,
  });
}

/**
 * Required ean property
 * @param options
 * @returns
 */
export function EanProperty(
  options: Partial<
    Omit<ApiPropertyOptions, 'type' | 'format' | 'specialFormat'>
  > = {}
) {
  return StringProperty({
    format: 'ean',
    specialFormat: 'ean',
    description: 'Ean property',
    example: '1234567891013',
    ...options,
  });
}

/**
 * Required phone property
 * @param options
 * @returns
 */
export function PhoneProperty(
  options: Partial<
    Omit<ApiPropertyOptions, 'type' | 'format' | 'specialFormat'>
  > = {}
) {
  return StringProperty({
    format: 'phone',
    specialFormat: 'phone',
    example: '19998889090',
    ...options,
  });
}

/**
 * Required phone property
 * @param options
 * @returns
 */
export function URLProperty(
  options: Partial<
    Omit<ApiPropertyOptions, 'type' | 'format' | 'specialFormat'>
  > = {}
) {
  return StringProperty({
    format: 'url',
    specialFormat: 'url',
    example: 'https://www.domain.com/page/1',
    ...options,
  });
}

/**
 * Required number property
 * @param options
 * @returns
 */
export function NumberProperty(
  options: Partial<Omit<ApiPropertyOptions, 'type'>> = {}
) {
  return Property({
    type: 'number',
    description: 'Number property',
    example: 0,
    ...options,
  });
}

/**
 * Required positive number property
 * @param options
 * @returns
 */
export function PositiveNumberProperty(
  options: Partial<Omit<ApiPropertyOptions, 'type' | 'minimum'>> = {}
) {
  return NumberProperty({
    minimum: 0,
    description: 'Positive number property',
    example: 1,
    ...options,
  });
}

/**
 * Required rate property
 * @param options
 * @returns
 */
export function RateProperty(
  options: Partial<Omit<ApiPropertyOptions, 'type'>> = {}
) {
  return NumberProperty({
    enum: [1, 2, 3, 4, 5],
    description: '1, 2, 3, 4, or 5',
    example: 5,
    ...options,
  });
}

/**
 * Required rate property
 * @param options
 * @returns
 */
export function TenProperty(
  options: Partial<Omit<ApiPropertyOptions, 'type'>> = {}
) {
  return NumberProperty({
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    description: '1, 2, 3, 4, 5, 6, 7, 8, 9 or 10',
    example: 7,
    ...options,
  });
}

/**
 * Required boolean property
 * @param options
 * @returns
 */
export function BooleanProperty(
  options: Partial<Omit<ApiPropertyOptions, 'type'>> = {}
) {
  return Property({
    type: 'boolean',

    description: 'true or false',
    example: true,
    ...options,
  });
}

/**
 * Required date property
 * @param options
 * @returns
 */
export function DateProperty(
  options: Partial<Omit<ApiPropertyOptions, 'type'>> = {}
) {
  return Property({
    type: 'date',
    description: 'Date value in ISO format ( value.toISOString() )',
    example: new Date().toISOString(),

    ...options,
  });
}
