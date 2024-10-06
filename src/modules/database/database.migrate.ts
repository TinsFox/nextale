import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './database.module';
import { databaseMigratePath } from '~/utils/path';

export async function migrateDatabase() {
  const migrations = databaseMigratePath();
  console.log('migrations: ', migrations);
  await migrate(db, { migrationsFolder: migrations });
}
