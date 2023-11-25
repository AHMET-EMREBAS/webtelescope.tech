import { ValueTransformer } from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt';

export function HashTransformer(): ValueTransformer {
  return {
    to(value) {
      return hashSync(value, genSaltSync(8));
    },
    from(value) {
      return value;
    },
  };
}

export function JSONTransformer(): ValueTransformer {
  return {
    to(value) {
      return JSON.stringify(value || {});
    },
    from(value) {
      return JSON.parse(value);
    },
  };
}
