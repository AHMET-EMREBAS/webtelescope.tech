export class ConfigKeyFactory {
  constructor(
    protected readonly prefix: string,
    protected readonly delimeter = '.'
  ) {}
  /**
   * CreateConfiguration key
   * @param name
   * @returns
   */
  key(name: string) {
    return `${this.prefix}${this.delimeter}${name}`.toUpperCase();
  }
}
