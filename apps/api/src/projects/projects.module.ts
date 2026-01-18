import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { DbModule } from '../db/db.module';
import { ProjectsController } from './projects.controller';
import { ContextModule } from 'src/context/tenant-context.module';
import { AuthModule } from '../auth/auth.module';
import { AuthzModule } from '../authz/authz.module';
import { CapabilityModule } from 'src/capabilities/capability.module';
import { PolicyRegistry } from 'src/authz/policy.registry';

@Module({
  imports: [DbModule, ContextModule, AuthModule, AuthzModule, CapabilityModule],
  providers: [ProjectsService],
  exports: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
