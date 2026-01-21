import { Injectable, Scope } from '@nestjs/common';
import { RequestContext } from './request-context.interface';

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  private context: Partial<RequestContext> | null = null;

  set(context: Partial<RequestContext>) {
    this.context = { ...this.context, ...context };
  }

  get(): RequestContext {
    if (
      !this.context?.organizationId ||
      !this.context?.userId ||
      !this.context?.role
    ) {
      throw new Error('Request context not initialized');
    }

    return this.context as RequestContext;
  }

  getUser(): Pick<RequestContext, 'userId' | 'role'> {
    if (!this.context?.userId || !this.context?.role) {
      throw new Error('Request context not initialized');
    }

    return {
      userId: this.context.userId,
      role: this.context.role,
    };
  }
}
