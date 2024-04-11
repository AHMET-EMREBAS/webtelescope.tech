export interface IRestResourceBuilder {
  Controller(): PropertyDecorator;
  FindAll(): PropertyDecorator;
  FindOneById(): PropertyDecorator;
  Save(): PropertyDecorator;
  Update(): PropertyDecorator;
  Delete(): PropertyDecorator;
  AddRelation(): PropertyDecorator;
  RemoveRelation(): PropertyDecorator;
  SetRelation(): PropertyDecorator;
  UnsetRelation(): PropertyDecorator;
  Count(): PropertyDecorator;
}
