export interface ViewSchema<
  ClassName extends string,
  PropertyName extends string
> {
  target: ClassName;
  select: Partial<Record<PropertyName, string>>;
}
