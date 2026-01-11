import { Injectable } from '@nestjs/common';
import { Action } from 'src/authz/actions';
import { PolicyRegistry } from 'src/authz/policy.registry';
import { Resource } from 'src/authz/resources';
import { RequestContextService } from 'src/context/request-context.service';
import { CapabilityMap } from './capability.types';

@Injectable()
export class CapabilityService {
  constructor(
    private readonly registry: PolicyRegistry,
    private readonly ctx: RequestContextService,
  ) {}

  evaluate<T>(
    resource: Resource,
    subject: T,
    actions: Action[],
  ): CapabilityMap {
    const policy = this.registry.get(resource);
    const context = this.ctx.get();

    return actions.reduce<CapabilityMap>((acc, action) => {
      acc[action] = policy.can(context, action, subject);
      return acc;
    }, {});
  }
}
