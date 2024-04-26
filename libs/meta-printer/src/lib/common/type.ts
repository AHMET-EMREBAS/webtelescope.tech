export type Type<T, Args = unknown> = {
  new (...args: Args[]): T;
};
