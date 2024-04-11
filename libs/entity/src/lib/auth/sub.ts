import { ISub } from '@webpackages/model';
import {
  OneRelation,
  PasswordColumn,
  StringColumn,
  TimestampEntity,
  UniqueNameColumn,
} from '@webpackages/typeorm';
import { SubType } from './sub-type';
import {
  Entity,
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';

/**
 * Subscription
 */
@Entity()
export class Sub extends TimestampEntity implements ISub<SubType> {
  @UniqueNameColumn() username!: string;
  @PasswordColumn() password!: string;
  @StringColumn({ unique: true }) orgname!: string;
  @OneRelation(SubType) subtype!: SubType;
}

/**
 * Upon subscription user related data should be created
 */
@EventSubscriber()
export class SubSubscriber implements EntitySubscriberInterface<Sub> {
  listenTo() {
    return Sub;
  }

  async beforeInsert(event: InsertEvent<Sub>) {
    // const manager = event.manager;
    // console.log(await manager.getRepository(SubType).find());
    // const orgRepo = manager.getRepository(Org);
    // const userRepo = manager.getRepository(User);
    // const { username, password, orgname, subtype } = event.entity;
    // const isOrgExist = await orgRepo.findOneBy({ orgname });
    // const isUserExist = await userRepo.findOneBy({ username });
    // if (isOrgExist)
    //   throw new UnprocessableEntityException('Organization already exist!');
    // if (isUserExist)
    //   throw new UnprocessableEntityException('User already exist!');
    // try {
    //   const organization = await manager.save(orgRepo.create({ orgname }));
    //   await manager.save(userRepo.create({ username, password, organization }));
    // } catch (err) {
    //   console.error(err);
    //   throw new InternalServerErrorException('Something went wrong');
    // }
  }
}
