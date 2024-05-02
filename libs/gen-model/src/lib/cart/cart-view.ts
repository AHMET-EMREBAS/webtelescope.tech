export interface ICartView {
  description: string;
  /**
   * Is chart checked out or not?
   */
  checked: boolean;
  customerUsername: string;
  userUsername: string;
  storeName: string;
}
