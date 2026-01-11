import { Module } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  providers: [MembershipsService],
  exports: [MembershipsService],
})
export class MembershipsModule {}
