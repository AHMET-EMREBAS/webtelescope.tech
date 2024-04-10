import { AccessPolicies } from '@webpackages/core';
import { Request } from 'express';

export function extractOrgnameFromHeader(req: Request): string {
  return (req.headers[AccessPolicies.X_ORGANIZATION] as string) ?? 'main';
}
