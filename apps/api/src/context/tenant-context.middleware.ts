import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestContextService } from './request-context.service';
import { NextFunction, Request, Response } from 'express';

export const PRE_TENANT_PATHS = ['/api/auth/login', '/api/me/organizations'];

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  constructor(private readonly tenantContext: RequestContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl;

    if (PRE_TENANT_PATHS.some((p) => url.startsWith(p))) {
      return next();
    }

    const organizationId = req.header('x-organization-id');

    if (!organizationId) {
      return res.status(400).json({
        error: 'Missing X-Organization-Id header',
      });
    }

    req['organizationId'] = organizationId;

    this.tenantContext.set({ organizationId });

    next();
  }
}
