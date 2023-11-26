import { DynamicModule, Inject, Module, OnModuleInit } from '@nestjs/common';
import { User, UserController, UserService } from './user';
import { Role, RoleController, RoleService } from './role';
import {
  Permission,
  PermissionController,
  PermissionService,
} from './permission';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SecurityCodeService } from './security-code.service';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ADMIN_ROLE_NAME } from './meta';

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
      controllers: [
        AuthController,
        UserController,
        RoleController,
        PermissionController,
      ],
    };
  }

  async onModuleInit() {
    const { username, password } = this.options;
    const adminRole = await this.roleRepo.save({ name: ADMIN_ROLE_NAME });
    await this.userRepo.save({
      username,
      password,
      roles: [{ id: adminRole.id }],
    });
  }
}
