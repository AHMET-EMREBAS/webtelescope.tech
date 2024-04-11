import { Logger } from '@nestjs/common';
import { AuthEnums } from '@webpackages/core';
import { Request } from 'express';

export function extractOrgnameFromHeader(req: Request): string {
  const logger = new Logger('Extractor');

  const result = (req.headers[AuthEnums.X_ORGNAME] as string) ?? 'main';
  logger.debug(`Extracted ${AuthEnums.X_ORGNAME} from headers : ${result}`);
  return result;
}
