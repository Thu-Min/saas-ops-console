import { Module, OnModuleInit } from '@nestjs/common';
import { PolicyRegistry } from './policy.registry';
import { ProjectPolicy } from './project.policy';

@Module({
  providers: [PolicyRegistry],
  exports: [PolicyRegistry],
})
export class AuthzModule implements OnModuleInit {
  constructor(private readonly registry: PolicyRegistry) {}

  onModuleInit() {
    this.registry.register(new ProjectPolicy());
  }
}
