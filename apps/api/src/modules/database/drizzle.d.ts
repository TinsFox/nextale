import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import * as schema from 'apps/api/src/database/schema';

export type DrizzleDB = PostgresJsDatabase<typeof schema>;
