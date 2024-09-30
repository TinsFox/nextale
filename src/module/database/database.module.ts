import { Module } from '@nestjs/common';

import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const DRIZZLE = Symbol('drizzle-connection');
import * as schema from '~/database/schema';

@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: async () => {
        const queryClient = postgres(process.env.DATABASE_URL!, {
          ssl: 'require',
        });
        return drizzle(queryClient, { schema }) as PostgresJsDatabase<
          typeof schema
        >;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
