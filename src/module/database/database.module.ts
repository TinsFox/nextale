import { Module } from '@nestjs/common';

import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const DRIZZLE = Symbol('drizzle-connection');
import * as schema from '~/database/schema';

export const postgresDBClient = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
});

export const db = drizzle(postgresDBClient, {
  schema,
  logger: true,
}) as PostgresJsDatabase<typeof schema>;

@Module({
  providers: [
    {
      provide: DRIZZLE,
      useValue: db,
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
