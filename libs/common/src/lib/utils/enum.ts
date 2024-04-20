import { Match } from './match';

/**
 * Create your enum classes using this factory to allow users to match values by guarding
 */
export class EnumFactory<T> {
  private constructor(private readonly enumClass: T) {}

  static create<T>(enumClass: T) {
    return new EnumFactory<T>(enumClass);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  matcher<R>(value: any) {
    return Match.start<T, R>(this.enumClass, value);
  }
}
