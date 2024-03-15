import { Request } from 'express';

export function getTokenFromAutorizationHeader(req: Request) {
  const [name, token] = req.headers.authorization?.split(' ') ?? [];
  if (name === 'Bearer' && token) return token;
  return null;
}
