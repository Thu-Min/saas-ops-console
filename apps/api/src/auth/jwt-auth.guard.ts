import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestContextService } from '../context/request-context.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly context: RequestContextService) {
    super();
  }

  handleRequest<TUser = JwtPayload>(
    err: any,
    user: JwtPayload | null,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    this.context.set({
      organizationId: user.organizationId,
      userId: user.sub,
      role: user.role,
    });

    return user as TUser;
  }
}
