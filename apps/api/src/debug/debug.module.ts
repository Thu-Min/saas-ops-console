import { Module } from '@nestjs/common';
import { DebugService } from './debug.service';
import { DebugController } from './debug.controller';
import { ContextModule } from 'src/context/tenant-context.module';

@Module({
  imports: [ContextModule],
  providers: [DebugService],
  controllers: [DebugController],
})
export class DebugModule {}
