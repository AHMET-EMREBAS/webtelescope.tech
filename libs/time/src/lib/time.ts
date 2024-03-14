export class Time {
  
  static second(count: number = 1) {
    return 1000 * count;
  }

  static minute(count: number = 1) {
    return this.second(60) * count;
  }

  static hour(count = 1) {
    return this.minute(60) * count;
  }

  static day(count = 1) {
    return this.hour(24) * count;
  }

  static month(count = 1) {
    return this.day(30) * count;
  }

  static year(count = 1) {
    return this.month(12) * count;
  }

  static decade(count = 1) {
    return this.year(10) * count;
  }
}
