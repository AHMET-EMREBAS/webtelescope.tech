import { Match } from './match';

/**
 * Create your enum classes using this factory to allow users to match values by guarding
 */
export class EnumFactory<T> {
  private constructor(private readonly enumClass: T) {}

  static create<T>(enumClass: T) {
    return new EnumFactory<T>(enumClass);
  }

  /**
   * The vale to match with enum values
   * @param value
   * @returns
   */
  matcher<R>(value: string | number): Omit<Match<T, R>, 'done'> {
    return Match.start<T, R>(this.enumClass, value);
  }
}
