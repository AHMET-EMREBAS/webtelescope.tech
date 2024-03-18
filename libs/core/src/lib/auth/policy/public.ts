import { SetMetadata } from '@nestjs/common';
import { AuthEnums } from '../enums';

export function PublicAccess() {
  return SetMetadata(AuthEnums.PUBLIC, true);
}
