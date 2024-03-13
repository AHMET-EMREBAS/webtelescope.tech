import { applyDecorators } from '@nestjs/common';
import { StringPropertyOptions } from '@webpackages/common';
import {
  IsEAN,
  IsEmail,
  IsIP,
  IsPhoneNumber,
  IsStrongPassword,
  MaxLength,
  MinLength,
  IsAlpha,
  IsCreditCard,
  IsDataURI,
  IsIn,
  IsAlphanumeric,
  IsIBAN,
  IsHSL,
  IsHash,
  IsISBN,
  IsHexColor,
  IsRgbColor,
} from 'class-validator';
import { parseValidationOptions } from './common-property';

/**
 * Validate string format like email, password, uuid etc.
 * @param options
 * @returns
 */
export function IsStringFormat(
  options: Pick<StringPropertyOptions, 'format' | 'isArray'>
) {
  const decorators: PropertyDecorator[] = [];

  const { format } = options;

  const vo = parseValidationOptions(options);

  if (format === 'email') decorators.push(IsEmail({}, vo));
  else if (format === 'barcode') decorators.push(IsEAN(vo));
  else if (format === 'ip4') decorators.push(IsIP('4', vo));
  else if (format === 'ip6') decorators.push(IsIP('6', vo));
  else if (format === 'password')
    decorators.push(IsStrongPassword(undefined, vo));
  else if (format === 'phone') decorators.push(IsPhoneNumber(undefined, vo));
  else if (format === 'alpha') decorators.push(IsAlpha(undefined, vo));
  else if (format === 'credit-card') decorators.push(IsCreditCard(vo));
  else if (format === 'data-uri') decorators.push(IsDataURI(vo));
  else if (format === 'alphanumeric')
    decorators.push(IsAlphanumeric(undefined, vo));
  else if (format === 'hash') decorators.push(IsHash('sha256', vo));
  else if (format === 'hex-color') decorators.push(IsHexColor(vo));
  else if (format === 'hsl') decorators.push(IsHSL(vo));
  else if (format === 'iban') decorators.push(IsIBAN(vo));
  else if (format === 'isbn10') decorators.push(IsISBN('10', vo));
  else if (format === 'isbn13') decorators.push(IsISBN('13', vo));
  else if (format === 'rgb-color') decorators.push(IsRgbColor(false, vo));

  return applyDecorators(...decorators);
}

/**
 * Text property decorator
 * @param options
 * @returns
 */
export function TextProperty(options: StringPropertyOptions) {
  const decorators: PropertyDecorator[] = [];

  const vo = parseValidationOptions(options);

  const { minLength, maxLength, format } = options;

  minLength !== undefined && decorators.push(MinLength(minLength, vo));
  maxLength !== undefined && decorators.push(MaxLength(maxLength, vo));

  options.minLength !== undefined &&
    decorators.push(MinLength(options.minLength, vo));

  format !== undefined && decorators.push(IsStringFormat(options));

  options.enum !== undefined && decorators.push(IsIn(options.enum, vo));

  return applyDecorators(...decorators);
}
