/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { hashSync, genSaltSync, compareSync } from 'bcrypt';

export function hash(data: any) {
  return hashSync(data, genSaltSync(8));
}

export function compare(data: any, encripted: any) {
  return compareSync(data, encripted);
}
