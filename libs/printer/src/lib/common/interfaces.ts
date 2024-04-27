/**
 * All printers implement this interface.
 */
export interface IPrint {
  /**
   * Print class, interface, property, decorator, doc, imports ...
   */
  print(): string;
}
