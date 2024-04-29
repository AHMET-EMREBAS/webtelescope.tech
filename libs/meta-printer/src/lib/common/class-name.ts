export enum ClassName {
  Entity = '#',
  View = '#View',
  CreateDto = 'Create#Dto',
  UpdateDto = 'Update#Dto',
  QueryDto = 'Query#Dto',
  IEntity = 'I#',
  IView = 'I#View',
  ICreateDto = 'I#CreateDto',
  IUpdateDto = 'I#UpdateDto',
  IQueryDto = 'I#QueryDto',
}

export class ClassNameBuilder {
  constructor(protected readonly className: string) {}

  Entity() {
    return ClassName.Entity.replace('#', this.className);
  }
  View() {
    return ClassName.View.replace('#', this.className);
  }
  Create() {
    return ClassName.CreateDto.replace('#', this.className);
  }
  Update() {
    return ClassName.UpdateDto.replace('#', this.className);
  }
  Query() {
    return ClassName.QueryDto.replace('#', this.className);
  }
  IEntity() {
    return ClassName.IEntity.replace('#', this.className);
  }
  IView() {
    return ClassName.IView.replace('#', this.className);
  }
  ICreate() {
    return ClassName.ICreateDto.replace('#', this.className);
  }
  IUpdate() {
    return ClassName.IUpdateDto.replace('#', this.className);
  }
  IQuery() {
    return ClassName.IQueryDto.replace('#', this.className);
  }
}
