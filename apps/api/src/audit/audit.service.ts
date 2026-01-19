import { Inject, Injectable } from '@nestjs/common';
import { RequestContextService } from 'src/context/request-context.service';
import type { DbClient } from 'src/db';
import { auditLogs } from 'src/db/schema';

@Injectable()
export class AuditService {
  constructor(
    @Inject('DB') private readonly db: DbClient,
    private readonly ctx: RequestContextService,
  ) {}

  async log(params: {
    resource: string;
    action: string;
    resourceId?: string;
    metadata?: unknown;
  }) {
    const context = this.ctx.get();

    await this.db.insert(auditLogs).values({
      organizationId: context.organizationId,
      actorUserId: context.userId,
      resource: params.resource,
      action: params.action,
      resourceId: params.resourceId,
      metadata: params.metadata ? JSON.stringify(params.metadata) : null,
    });
  }
}
