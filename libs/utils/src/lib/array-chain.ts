export class MyArray<T> {
  protected readonly array: T[] = [];

  push(item: T, c?: () => void) {
    this.array.push(item) && c && c();
    return this;
  }
  pop(c?: <T>(v: T) => void) {
    const p = this.array.pop();
    c && c(p);
    return this;
  }
}
