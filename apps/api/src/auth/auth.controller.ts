import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { and, eq } from 'drizzle-orm';
import type { DbClient } from 'src/db';
import { memberships, users } from 'src/db/schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('DB') private readonly db: DbClient,
  ) {}

  @Post('login')
  async login(@Body('email') email: string) {
    if (!email) {
      throw new UnauthorizedException('Email required');
    }

    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then((r) => r[0]);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const membership = await this.db
      .select()
      .from(memberships)
      .where(
        and(eq(memberships.userId, user.id), eq(memberships.isActive, true)),
      )
      .limit(1)
      .then((r) => r[0]);

    if (!membership) {
      throw new UnauthorizedException('No active membership');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      organizationId: membership.organizationId,
      role: membership.role,
    });

    return { token };
  }
}
