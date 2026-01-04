import { Controller, Get } from '@nestjs/common';
import { TenantContextService } from 'src/context/tenant-context.service';

@Controller('debug')
export class DebugController {
  constructor(private readonly tenantContext: TenantContextService) {}

  @Get('tenant')
  getTenant() {
    return this.tenantContext.get();
  }
}
