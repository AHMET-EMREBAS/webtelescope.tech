import {
  DynamicModule,
  Global,
  Inject,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller';
import { InjectRepository as Inc, TypeOrmModule } from '@nestjs/typeorm';
import { Permission, Role, Session, User } from './user';
import { Repository as Repo } from 'typeorm';
import { ClassConstructor as CC } from 'class-transformer';
import { PermissionAction, createPermission } from './decorators';

export type AuthModuleOptions = {
  resourceEntities: CC<any>[];
  roleNames: string[];
  root: RootUser;
};

export const RESOURCE_ENTITIES = Symbol('RESOURCE_ENTITIES');
export const ROLE_NAMES = Symbol('ROLE_NAMES');
export const ROOT_USER = Symbol('ROOT_USER');

export type RootUser = {
  username: string;
  password: string;
};
@Global()
@Module({})
export class AuthModule implements OnModuleInit {
  constructor(
    @Inc(User) private readonly userRepo: Repo<User>,
    @Inc(Role) private readonly roleRepo: Repo<Role>,
    @Inc(Permission) private readonly perRepo: Repo<Permission>,
    @Inject(RESOURCE_ENTITIES) private readonly resEntities: CC<any>[],
    @Inject(ROLE_NAMES) private readonly roleNames: string[],
    @Inject(ROOT_USER) private readonly rootUser: RootUser
  ) {}

  static configure(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        TypeOrmModule.forFeature([User, Role, Permission, Session]),
        JwtModule.register({
          global: true,
          secret: process.env['SECRET'] || 'SECRET',
          signOptions: {
            expiresIn: '30d',
          },
        }),
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: RESOURCE_ENTITIES,
          useValue: options.resourceEntities,
        },
        {
          provide: ROOT_USER,
          useValue: { ...options.root },
        },
        {
          provide: ROLE_NAMES,
          useValue: options.roleNames,
        },
      ],
      exports: [
        JwtModule,
        TypeOrmModule.forFeature([User, Role, Permission, Session]),
      ],
    };
  }
  async onModuleInit() {
    for (const resourceEntity of this.resEntities) {
      for (const actionName of [
        'write',
        'read',
        'update',
        'delete',
      ] as PermissionAction[]) {
        await this.perRepo.save({
          name: createPermission(actionName, resourceEntity.name),
        });
      }
    }

    for (const r of this.roleNames) {
      await this.roleRepo.save({ name: r });
    }

    try {
      await this.roleRepo.save({ name: 'admin' });
    } catch (err) {}
    const adminRole = await this.roleRepo.findOneBy({ name: 'admin' });

    await this.userRepo.save({
      ...this.rootUser,
      roles: [{ id: adminRole?.id }],
    });
  }
}
