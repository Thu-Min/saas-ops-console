import { Module } from '@nestjs/common';
import { MembershipsService } from './memberships.service';

@Module({
  imports: [],
  providers: [MembershipsService],
  exports: [MembershipsService],
})
export class MembershipsModule {}
