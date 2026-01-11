import { Inject, Injectable } from '@nestjs/common';
import type { DbClient } from '../db';
import { memberships } from '../db/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class MembershipsService {
  constructor(@Inject('DB') private readonly db: DbClient) {}

  async validateMembership(userId: string, organizationId: string) {
    const result = await this.db
      .select()
      .from(memberships)
      .where(
        and(
          eq(memberships.userId, userId),
          eq(memberships.organizationId, organizationId),
          eq(memberships.isActive, true),
        ),
      )
      .limit(1);

    return result[0] ?? null;
  }
}
