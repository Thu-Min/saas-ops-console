import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestContextService } from 'src/context/request-context.service';

@Controller('debug')
export class DebugController {
  constructor(private readonly tenantContext: RequestContextService) {}

  @UseGuards(JwtAuthGuard)
  @Get('tenant')
  getTenant() {
    return this.tenantContext.get();
  }
}
