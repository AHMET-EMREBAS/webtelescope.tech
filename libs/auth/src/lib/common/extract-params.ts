import { AuthEnums } from '@webpackages/core';
import { Request } from 'express';

export function extractOrgnameFromHeader(req: Request): string {
  return (req.headers[AuthEnums.X_ORGNAME] as string) ?? 'main';
}
