import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { RequestContextService } from 'src/context/request-context.service';
import type { DbClient } from 'src/db';
import { memberships, organizations } from 'src/db/schema';

@Injectable()
export class MeService {
  constructor(
    @Inject('DB') private readonly db: DbClient,
    private readonly ctx: RequestContextService,
  ) {}

  async myOrganizations() {
    const { userId } = this.ctx.getUser();

    return await this.db
      .select({
        id: organizations.id,
        name: organizations.name,
        role: memberships.role,
      })
      .from(memberships)
      .innerJoin(
        organizations,
        eq(memberships.organizationId, organizations.id),
      )
      .where(
        and(eq(memberships.userId, userId), eq(memberships.isActive, true)),
      );
  }
}
