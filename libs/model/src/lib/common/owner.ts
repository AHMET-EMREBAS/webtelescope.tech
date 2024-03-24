/**
 * Owner proeprty stores the owner of the enity such as image owner, article owner, blog owner.
 * @param owner {@link owner}
 */
export interface IOwner<Owner> {
  /**
   * Owner entity such as User, Product, Blog or any entity that owns this entity
   */
  owner: Owner;
}

/**
 * Target proeprty is like an owner property.
 * While the owner describes the ownership, target describes the associated entity
 */
export interface ITarget<Owner> {
  target: Owner;
}
