import { Module } from '@nestjs/common';
import { CapabilityService } from './capability.service';
import { PolicyRegistry } from 'src/authz/policy.registry';
import { RequestContextService } from 'src/context/request-context.service';

@Module({
  imports: [],
  providers: [CapabilityService, PolicyRegistry, RequestContextService],
  exports: [CapabilityService],
})
export class CapabilityModule {}
