import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import * as schema from '~/database/schema';

export type DrizzleDB = PostgresJsDatabase<typeof schema>;
