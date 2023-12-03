import { Injectable } from '@nestjs/common';
import { Permission, Role, User } from '../entities';
import { BuildService } from '../services/__base-service';

@Injectable()
export class UserService extends BuildService<User>(User) {}

@Injectable()
export class RoleService extends BuildService<Role>(Role) {}

@Injectable()
export class PermissionService extends BuildService<Permission>(Permission) {}
