import { Args, ArgsOptions, Int } from '@nestjs/graphql';

export function IdArg() {
  return Args('id', { type: () => Int });
}

export function BodyArg(options: ArgsOptions) {
  return Args('body', options);
}

export function QueryArg(options: ArgsOptions) {
  return Args('query', options);
}

export function AddRelationArg(options: ArgsOptions) {
  return Args('addRelation', options);
}

export function RemoveRelationArg(options: ArgsOptions) {
  return Args('removeRelation', options,);
}

export function SetRelationArg(options: ArgsOptions) {
  return Args('setRelation', options);
}

export function UnsetRelation(options: ArgsOptions) {
  return Args('unstRelation', options);
}
