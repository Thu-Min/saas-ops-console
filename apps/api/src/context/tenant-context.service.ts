import { Injectable, Scope } from '@nestjs/common';
import { TenantContext } from './tenant-context.interface';

@Injectable({ scope: Scope.REQUEST })
export class TenantContextService {
  private context: TenantContext | null = null;

  set(context: TenantContext) {
    this.context = context;
  }

  get(): TenantContext {
    if (!this.context) {
      throw new Error('Tenant context not initialized');
    }

    return this.context;
  }
}
