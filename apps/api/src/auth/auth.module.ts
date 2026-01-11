import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { MembershipsModule } from '../memberships/memberships.module';
import { ContextModule } from '../context/tenant-context.module';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthController } from './auth.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [
    DbModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') ?? '',
        signOptions: { expiresIn: '15m' },
      }),
    }),
    MembershipsModule,
    ContextModule,
  ],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard, MembershipsModule],
  controllers: [AuthController],
})
export class AuthModule {}
