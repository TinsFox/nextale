import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { databaseMigratePath } from '~/utils/path';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const postgresDBClient = postgres(process.env.DATABASE_URL!, {
    ssl: 'require',
  });
  await migrate(postgresDBClient, {
    migrationsFolder: databaseMigratePath(),
  });
}

main();
