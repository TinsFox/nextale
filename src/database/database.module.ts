import { config } from 'dotenv';
import { Module } from '@nestjs/common';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

config({
  path: ['.env', '.env.production', '.env.local'],
});

const queryClient = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export const db: PostgresJsDatabase = drizzle(queryClient, {
  logger: true,
});

const dbProvider = {
  provide: 'POSTGRES_POOL',
  useValue: db,
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DatabaseModule {}
