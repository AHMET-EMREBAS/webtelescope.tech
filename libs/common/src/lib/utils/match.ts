/* eslint-disable @typescript-eslint/no-explicit-any */

import { Some } from '../types';

type AllKeysUsed<E, R, K extends keyof E> = Match<Omit<E, K>, R>;

export class Match<E, R> {
  private constructor(
    private readonly enumClass: E,
    private readonly value: any
  ) {}

  static start<T, R>(enumClass: T, value: any) {
    return new Match<T, R>(enumClass, value);
  }

  private result?: () => R;

  is<K extends keyof E>(e: K, handler: () => R): AllKeysUsed<E, R, K> {
    if (this.enumClass[e] === this.value) {
      if (!this.result) {
        this.result = handler;
      }
    }
    return this as AllKeysUsed<E, R, K>;
  }

  done(): Some<R> {
    return this.result ? this.result() : undefined;
  }
}
