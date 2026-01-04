import { Injectable } from '@nestjs/common';
import { Resource } from './resources';
import { Policy } from './policy.interface';

@Injectable()
export class PolicyRegistry {
  private policies = new Map<Resource, Policy>();

  register(policy: Policy) {
    this.policies.set(policy.resource, policy);
  }

  get(resource: Resource): Policy {
    const policy = this.policies.get(resource);
    if (!policy) {
      throw new Error(`No policy registered for ${resource}`);
    }

    return policy;
  }
}
