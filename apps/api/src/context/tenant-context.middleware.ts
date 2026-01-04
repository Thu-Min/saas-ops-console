import { Injectable, NestMiddleware } from '@nestjs/common';
import { TenantContextService } from './tenant-context.service';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  constructor(private readonly tenantContext: TenantContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const organizationId = req.header('x-organization-id');

    if (!organizationId) {
      return res.status(400).json({
        error: 'Missing X-Organization-Id header',
      });
    }

    this.tenantContext.set({ organizationId });
    next();
  }
}
