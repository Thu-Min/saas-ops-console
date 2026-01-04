import { Inject, Injectable } from '@nestjs/common';
import { db } from '../db';
import { memberships } from '../db/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class MembershipsService {
  async validateMembership(userId: string, organizationId: string) {
    const result = await db
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
