import { ICreateSecurityCodeDto } from '@webpackages/model';
import { Dto, NumberProperty, StringProperty } from '@webpackages/property';

/**
 * @param securityCode {@link securityCode}
 * @param userId {@link userId}
 */
@Dto()
export class CreateSecurityCodeDto implements ICreateSecurityCodeDto {
  @StringProperty() securityCode!: string;
  @NumberProperty() userId!: number;
}
