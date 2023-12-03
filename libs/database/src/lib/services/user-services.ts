import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from './__base-service';
import { Permission, Role, User, UserCredential, UserDetail, UserEmail, UserImage, UserPhone } from '../entities';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    repo: Repository<User>
  ) {
    super(repo);
  }
}

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    repo: Repository<Role>
  ) {
    super(repo);
  }
}

@Injectable()
export class PermissionService extends BaseService<Permission> {
  constructor(
    @InjectRepository(Permission)
    repo: Repository<Permission>
  ) {
    super(repo);
  }
}

@Injectable()
export class UserCredentialService extends BaseService<UserCredential> {
  constructor(
    @InjectRepository(UserCredential)
    repo: Repository<UserCredential>
  ) {
    super(repo);
  }
}

@Injectable()
export class UserDetailService extends BaseService<UserDetail> {
  constructor(
    @InjectRepository(UserDetail)
    repo: Repository<UserDetail>
  ) {
    super(repo);
  }
}

@Injectable()
export class UserEmailService extends BaseService<UserEmail> {
  constructor(
    @InjectRepository(UserEmail)
    repo: Repository<UserEmail>
  ) {
    super(repo);
  }
}

@Injectable()
export class UserPhoneService extends BaseService<UserPhone> {
  constructor(
    @InjectRepository(UserPhone)
    repo: Repository<UserPhone>
  ) {
    super(repo);
  }
}

@Injectable()
export class UserImageService extends BaseService<UserImage> {
  constructor(
    @InjectRepository(UserImage)
    repo: Repository<UserImage>
  ) {
    super(repo);
  }
}
