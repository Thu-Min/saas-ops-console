import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ContextModule } from './context/tenant-context.module';
import { DebugModule } from './debug/debug.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { AuthzModule } from './authz/authz.module';
import { CapabilityModule } from './capabilities/capability.module';
import { ProjectsModule } from './projects/projects.module';
import { AuditModule } from './audit/audit.module';
import { MeModule } from './me/me.module';

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
    CapabilityModule,
    ProjectsModule,
    AuditModule,
    MeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
