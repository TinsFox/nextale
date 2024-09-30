import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './database.module';
import { databaseMigratePath } from 'src/utils/path';

export async function migrateDatabase() {
  // This will run migrations on the database, skipping the ones already applied
  const migrations = databaseMigratePath();
  console.log('migrations: ', migrations);
  await migrate(db, { migrationsFolder: migrations });
}
