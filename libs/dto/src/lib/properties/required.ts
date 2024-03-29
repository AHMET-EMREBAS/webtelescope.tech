import { IsNotEmpty, IsOptional, ValidationOptions } from 'class-validator';

export function IsRequired(
  required: boolean | undefined,
  validationOptions: ValidationOptions
) {
  return required === true
    ? IsNotEmpty(validationOptions)
    : IsOptional(validationOptions);
}
