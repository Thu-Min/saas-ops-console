import { Module } from '@nestjs/common';
import { CapabilityService } from './capability.service';
import { AuthzModule } from 'src/authz/authz.module';
import { ContextModule } from 'src/context/tenant-context.module';

@Module({
  imports: [AuthzModule, ContextModule],
  providers: [CapabilityService],
  exports: [CapabilityService],
})
export class CapabilityModule {}
