import { DynamicModule, Inject, Module, OnModuleInit } from '@nestjs/common';
import { Permission, Role, User } from './user.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { Repository } from 'typeorm';
import {
  ADMIN_ROLE,
  ResourceAction,
  SUBSCRIBER_ROLE,
  createPermission,
} from './auth';
import { ClassConstructor } from 'class-transformer';

export class AuthModuleOptions {
  secret!: string;
  username!: string;
  password!: string;
  resources?: ClassConstructor<unknown>[];
}

@Module({})
export class AuthModule implements OnModuleInit {
  static register(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        JwtModule.register({
          global: true,
          secret: options.secret,
          signOptions: {
            expiresIn: '30d',
          },
        }),
        TypeOrmModule.forFeature([User, Role, Permission]),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        AuthGuard,
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },

        {
          provide: AuthModuleOptions,
          useValue: options,
        },
      ],
    };
  }

  constructor(
    @Inject(AuthModuleOptions) protected readonly options: AuthModuleOptions,
    @InjectRepository(User) protected readonly userRepo: Repository<User>,
    @InjectRepository(Role) protected readonly roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    protected readonly permissionRepo: Repository<Permission>
  ) {}

  async onModuleInit() {
    const resources = [
      User,
      Role,
      Permission,
      ...(this.options.resources || []),
    ];

    // Builtin Roles
    const roles = [ADMIN_ROLE, SUBSCRIBER_ROLE];

    // Create roles
    for (const role of roles) {
      try {
        await this.roleRepo.save({ name: role });
      } catch (err) {
        console.log(err);
      }
    }

    // Create Permissions
    for (const resource of resources) {
      for (const action of [
        'read',
        'write',
        'delete',
        'update',
      ] as ResourceAction[]) {
        try {
          await this.permissionRepo.save({
            name: createPermission(action, resource.name),
          });
        } catch (err) {
          console.log(err);
        }
      }
    }

    // Create root user
    const { username, password } = this.options;
    const adminRole = await this.roleRepo.findOneBy({ name: ADMIN_ROLE });
    if (adminRole) {
      await this.userRepo.save({
        username,
        password,
        roles: [{ id: adminRole.id }],
      });
    } else {
      throw new Error('Could not create the root user');
    }
  }
}
