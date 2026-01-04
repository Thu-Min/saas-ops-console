import { Module } from '@nestjs/common';
import { db } from './index';

@Module({
  providers: [
    {
      provide: 'DB',
      useValue: db,
    },
  ],
  exports: ['DB'],
})
export class DbModule {}
