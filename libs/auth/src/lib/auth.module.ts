import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { v4 } from 'uuid';

@Module({
  imports: [
    JwtModule.register({
      privateKey: process.env['PRIVATE_KEY'] || v4(),
      secret: process.env['SECRET'] || v4(),
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
})
export class AuthModule {}
