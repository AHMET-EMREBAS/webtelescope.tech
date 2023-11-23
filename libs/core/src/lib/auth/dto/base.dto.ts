export class BaseDto<T> {
  constructor(t: T) {
    Object.assign(this, t);
  }
}
