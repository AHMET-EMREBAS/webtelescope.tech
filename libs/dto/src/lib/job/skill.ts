import { ICreateSkillDto, IID } from '@webpackages/model';
import { Dto, NameProperty, ObjectIdProperty } from '@webpackages/property';

@Dto()
export class CreateSkillDto implements ICreateSkillDto {
  @NameProperty() skillName!: string;
  @ObjectIdProperty() industry!: IID;
}
