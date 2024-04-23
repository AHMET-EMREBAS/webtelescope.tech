export interface IToggleValue {
  /**
   * @param actualValue Actual value
   * @param conditionalValue Conditional value
   */
  toggleValue<T>(actualValue: T, conditionalValue: T): T;
}

export interface IToggle {
  /**
   *
   * @param anyRequriedInput Toggle any thing
   */
  toggle<T>(anyRequriedInput?: T): void;
  toggle<T>(anyRequriedInput: T): void;
}
