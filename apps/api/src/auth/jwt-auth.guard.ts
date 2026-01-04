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

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly context: RequestContextService,
    private readonly memberships: MembershipsService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request?.user as JwtPayload | undefined;
    if (!user) {
      throw new UnauthorizedException();
    }

    const membership = await this.memberships.validateMembership(
      user.sub,
      user.organizationId,
    );
    if (!membership) {
      throw new ForbiddenException('User is not a member of this organization');
    }

    this.context.set({
      organizationId: user.organizationId,
      userId: user.sub,
      role: user.role,
    });

    return true;
  }
}
