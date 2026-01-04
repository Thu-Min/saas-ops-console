import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ContextModule } from './context/tenant-context.module';
import { DebugModule } from './debug/debug.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/api/.env'],
    }),
    DbModule,
    ContextModule,
    DebugModule,
    AuthModule,
    AuthzModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
