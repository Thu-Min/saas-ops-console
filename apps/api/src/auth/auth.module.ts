import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MembershipsModule } from '../memberships/memberships.module';
import { ContextModule } from '../context/tenant-context.module';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '15m' },
    }),
    MembershipsModule,
    ContextModule,
  ],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard, MembershipsModule],
})
export class AuthModule {}
