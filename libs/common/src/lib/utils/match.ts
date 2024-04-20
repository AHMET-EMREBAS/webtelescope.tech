/* eslint-disable @typescript-eslint/no-explicit-any */

import { Some } from '../types';

type OmitUsedKeys<E, R, K extends keyof E> = Match<Omit<E, K>, R>;

export class Match<E, R> {
  private constructor(
    private readonly enumClass: E,
    private readonly value: any
  ) {}

  static start<T, R>(enumClass: T, value: any) {
    return new Match<T, R>(enumClass, value);
  }

  private resultFn?: () => R;

  /**
   * If value matches with the enum value, then set this handler as a result value.
   */
  is<K extends keyof E>(
    enumKey: K,
    handler: Some<() => R>
  ): Omit<OmitUsedKeys<E, R, K>, 'get'> {
    if (this.resultFn === undefined) {
      if (this.enumClass[enumKey] === this.value) {
        this.resultFn = handler;
      }
    }
    return this as OmitUsedKeys<E, R, K>;
  }

  /**
   * Verify that you are done with matching enums,
   * if there are more enum keys to match, they will appear as an option
   * @param verify
   */
  done<K extends keyof E>(verify: K | 'DONE'): Pick<Match<E, R>, 'get'> {
    if (verify === 'DONE') {
      return this;
    }
    throw new Error(
      'You must explicitly verify that you are DONE by passing DONE!'
    );
  }

  /**
   * Get the result or undefined
   */
  get(): Some<R> {
    return this.resultFn ? this.resultFn() : undefined;
  }
}
