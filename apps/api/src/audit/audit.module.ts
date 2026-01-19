import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { DbModule } from 'src/db/db.module';
import { ContextModule } from 'src/context/tenant-context.module';

@Module({
  imports: [DbModule, ContextModule],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}
