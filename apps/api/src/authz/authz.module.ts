import { Module, OnModuleInit } from '@nestjs/common';
import { PolicyRegistry } from './policy.registry';
import { ProjectPolicy } from './project.policy';
import { PolicyGuard } from './policy.guard';
import { ContextModule } from '../context/tenant-context.module';

@Module({
  imports: [ContextModule],
  providers: [PolicyRegistry, PolicyGuard],
  exports: [PolicyRegistry, PolicyGuard],
})
export class AuthzModule implements OnModuleInit {
  constructor(private readonly registry: PolicyRegistry) {}

  onModuleInit() {
    this.registry.register(new ProjectPolicy());
  }
}
