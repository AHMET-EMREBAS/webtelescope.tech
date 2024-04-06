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
import { Role } from './role';

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
    const orgRepo = event.manager.getRepository(Organization);
    const userRepo = event.manager.getRepository(User);
    const roleRepo = event.manager.getRepository(Role);

    const { username, password, organizationName } = event.entity;

    const adminRole = await roleRepo.findOneOrFail({
      where: { role: 'ADMIN' },
    });

    const foundOrg = await orgRepo.findOneBy({ organizationName });
    const foundUser = await userRepo.findOneBy({ username });

    if (foundOrg && foundUser) {
      throw new UnprocessableEntityException(
        'Organization and User already exist!'
      );
    }

    try {
      const savedOrg: Organization = await orgRepo.save({ organizationName });
      await userRepo.save({
        username,
        password,
        roles: [{ id: adminRole.id }],
        organization: { id: savedOrg.id },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
