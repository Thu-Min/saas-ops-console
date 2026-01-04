import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PolicyRegistry } from './policy.registry';
import { RequestContextService } from 'src/context/request-context.service';
import { Action } from './actions';
import { Resource } from './resources';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly registry: PolicyRegistry,
    private readonly ctxService: RequestContextService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const action = this.reflector.get<Action>('action', context.getHandler());
    const resource = this.reflector.get<Resource>(
      'resource',
      context.getHandler(),
    );

    if (!action || !resource) {
      return true;
    }

    const policy = this.registry.get(resource);
    const request = context.switchToHttp().getRequest();

    const subject = request.subject;
    const allowed = policy.can(this.ctxService.get(), action, subject);

    if (!allowed) {
      throw new ForbiddenException('Action not permitted');
    }

    return true;
  }
}
