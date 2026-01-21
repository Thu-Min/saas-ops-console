import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { MeService } from './me.service';
import { ContextModule } from 'src/context/tenant-context.module';
import { DbModule } from 'src/db/db.module';
import { MembershipsModule } from 'src/memberships/memberships.module';

@Module({
  imports: [DbModule, ContextModule, MembershipsModule],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
