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
import { User } from './user';
import { Organization } from './organization';
import {
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';

/**
 * Subscription
 */
@Entity()
export class Sub extends TimestampEntity implements ISub<SubType> {
  @UniqueNameColumn() username!: string;
  @PasswordColumn() password!: string;
  @StringColumn({ unique: true }) organizationName!: string;
  @OneRelation(SubType) subType!: SubType;
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
    // const orgRepo = manager.getRepository(Organization);
    // const userRepo = manager.getRepository(User);
    // const { username, password, organizationName } = event.entity;
    // const isOrgExist = await orgRepo.findOneBy({ organizationName });
    // const isUserExist = await userRepo.findOneBy({ username });
    // if (isOrgExist)
    //   throw new UnprocessableEntityException('Organization already exist!');
    // if (isUserExist)
    //   throw new UnprocessableEntityException('User already exist!');
    // try {
    //   const organization = await manager.save(
    //     orgRepo.create({ organizationName })
    //   );
    //   await manager.save(userRepo.create({ username, password, organization }));
    // } catch (err) {
    //   console.error(err);
    //   throw new InternalServerErrorException('Something went wrong');
    // }
  }
}
