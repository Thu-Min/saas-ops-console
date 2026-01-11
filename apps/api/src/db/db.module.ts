import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createDb } from './index';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DB',
      useFactory: (config: ConfigService) => {
        const port = Number(config.get<string>('DB_PORT'));

        return createDb({
          host: config.get<string>('DB_HOST') ?? 'localhost',
          port: Number.isNaN(port) ? 5432 : port,
          user: config.get<string>('DB_USER') ?? 'postgres',
          password: config.get<string>('DB_PASSWORD') ?? '',
          database: config.get<string>('DB_NAME') ?? 'postgres',
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DB'],
})
export class DbModule {}
