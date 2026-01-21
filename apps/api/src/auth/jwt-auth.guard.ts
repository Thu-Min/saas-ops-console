import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestContextService } from '../context/request-context.service';
import { JwtPayload } from './jwt-payload.interface';
import { MembershipsService } from '../memberships/memberships.service';
import { PRE_TENANT_PATHS } from 'src/context/tenant-context.middleware';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly context: RequestContextService,
    private readonly memberships: MembershipsService,
  ) {
    super();
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const canActivate = (await super.canActivate(ctx)) as boolean;
    if (!canActivate) return false;

    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    if (!user) {
      throw new UnauthorizedException();
    }

    const url = request.originalUrl;

    if (PRE_TENANT_PATHS.some((p) => url.startsWith(p))) {
      this.context.set({
        userId: user.sub,
        role: user.role,
      });
      return true;
    }

    const headerOrgId = request.headers['x-organization-id'];
    if (!headerOrgId || typeof headerOrgId !== 'string') {
      throw new ForbiddenException('Missing X-Organization-Id header');
    }

    const membership = await this.memberships.validateMembership(
      user.sub,
      headerOrgId,
    );

    if (!membership) {
      throw new ForbiddenException('User is not a member of this organization');
    }

    this.context.set({
      organizationId: headerOrgId,
      userId: user.sub,
      role: membership.role,
    });

    return true;
  }
}
