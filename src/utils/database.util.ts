import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

let databaseConnectionPromise: PostgresJsDatabase | undefined;

export const getDatabaseConnection = (): PostgresJsDatabase => {
  if (!databaseConnectionPromise) {
    databaseConnectionPromise = drizzle(
      postgres(process.env.DATABASE_URL!, { ssl: 'require' }),
      {
        logger: true,
      },
    );
  }
  return databaseConnectionPromise;
};
