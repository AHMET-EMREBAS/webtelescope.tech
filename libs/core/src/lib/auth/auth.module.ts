/* eslint-disable @nx/enforce-module-boundaries */
import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Organization, Permission, Role, User } from '../entities';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SecurityCodeService } from './security-code.service';
import { AuthGuard } from './guards';
import { Repository } from 'typeorm';
import { seedPermissions, createAdminRole } from './seed';
import { APP_PASSWORD, APP_USERNAME } from '@webtelescopetech/common';

export type AuthModuleOptions = {
  secret: string;
  rootUsername?: string;
  rootPassword?: string;
};

/**
 * Do not forgot to create root user
 */
@Module({})
export class AuthModule implements OnModuleInit {
  static configure(options: AuthModuleOptions): DynamicModule {
    const { secret } = options;
    return {
      module: AuthModule,
      imports: [
        EventEmitterModule,
        TypeOrmModule.forFeature([Organization, User, Role, Permission]),
        JwtModule.register({
          secret: secret,
          signOptions: {
            expiresIn: '30d',
          },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        SecurityCodeService,
        { provide: APP_GUARD, useClass: AuthGuard },
      ],
    };
  }

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>
  ) {}

  async onModuleInit() {
    await seedPermissions([User, Role, Permission], this.permissionRepo);
    await createAdminRole(this.roleRepo);

    const username = process.env[APP_USERNAME];
    const password = process.env[APP_PASSWORD];

    if (!username)
      throw new Error(APP_USERNAME + ' is not provided in environment!');
    if (!password)
      throw new Error(APP_PASSWORD + ' is not provided in environment!');

    console.log(username, password);
    await this.userRepo.save({ username, password });
  }
}
