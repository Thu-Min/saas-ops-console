import { Module } from '@nestjs/common';
import { DebugService } from './debug.service';
import { DebugController } from './debug.controller';
import { ContextModule } from '../context/tenant-context.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, ContextModule],
  providers: [DebugService],
  controllers: [DebugController],
})
export class DebugModule {}
