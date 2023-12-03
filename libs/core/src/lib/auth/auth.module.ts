import { DynamicModule, Inject, Module, OnModuleInit } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SecurityCodeService } from './security-code.service';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionService, RoleService, UserService } from './user.service';
import { Permission, Role, User } from '../entities';
import { AuthTokens } from './metadata';

export class AuthModuleOptions {
  secret!: string;
  username!: string;
  password!: string;
}

@Module({})
export class AuthModule implements OnModuleInit {
  constructor(
    @Inject(AuthModuleOptions) public readonly options: AuthModuleOptions,
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Role) public readonly roleRepo: Repository<Role>
  ) {}

  static register(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        TypeOrmModule.forFeature([User, Role, Permission]),
        EventEmitterModule,
        JwtModule.register({
          global: true,
          secret: options.secret,
          signOptions: { expiresIn: '30d' },
        }),
      ],
      providers: [
        SecurityCodeService,
        UserService,
        RoleService,
        PermissionService,
        {
          provide: AuthModuleOptions,
          useValue: options,
        },
      ],
      controllers: [AuthController],
    };
  }

  async onModuleInit() {
    const { username, password } = this.options;

    const foundAdminRole = await this.roleRepo.findOneBy({
      name: AuthTokens.ADMIN_ROLE,
    });

    let adminRole = foundAdminRole;

    if (!foundAdminRole) {
      adminRole = await this.roleRepo.save({ name: AuthTokens.ADMIN_ROLE });
    }

    const foundAdminUser = await this.userRepo.findOneBy({ username });
    if (!foundAdminUser) {
      await this.userRepo.save({
        username,
        password,
        roles: [{ id: adminRole!.id }],
      });
    }

    // Manage subscription roles
    const foundSubscriberRole = await this.roleRepo.findOneBy({
      name: AuthTokens.SUBSCRIBER_ROLE,
    });

    if (!foundSubscriberRole) {
      await this.roleRepo.save({ name: AuthTokens.SUBSCRIBER_ROLE });
    }
  }
}
