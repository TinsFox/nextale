import { Global, Logger, LoggerService, Module } from '@nestjs/common';

import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { isProduction } from '~/common/constants/env.constant';

export const DRIZZLE = Symbol('drizzle-connection');
import * as schema from '~/database/schema';

export const postgresDBClient = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
});

class DrizzleNestLogger extends Logger {
  protected context?: string;
  protected options: { timestamp?: boolean };
  protected localInstanceRef?: LoggerService;

  constructor() {
    super(DrizzleNestLogger.name);
  }

  get localInstance(): LoggerService {
    throw new Error('Method not implemented.');
  }
  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: [...any, string?, string?]): void;
  error(
    message: unknown,
    stack?: unknown,
    context?: unknown,
    ...rest: unknown[]
  ): void {
    this.logger.error(message, stack, context, ...rest);
  }
  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: [...any, string?]): void;
  log(message: unknown, context?: unknown, ...rest: unknown[]): void {
    this.logger.log(message, context, ...rest);
  }
  warn(message: any, context?: string): void;
  warn(message: any, ...optionalParams: [...any, string?]): void;
  warn(message: unknown, context?: unknown, ...rest: unknown[]): void {
    this.logger.warn(message, context, ...rest);
  }
  debug(message: any, context?: string): void;
  debug(message: any, ...optionalParams: [...any, string?]): void;
  debug(message: unknown, context?: unknown, ...rest: unknown[]): void {
    this.logger.debug(message, context, ...rest);
  }
  verbose(message: any, context?: string): void;
  verbose(message: any, ...optionalParams: [...any, string?]): void;
  verbose(message: unknown, context?: unknown, ...rest: unknown[]): void {
    this.logger.verbose(message, context, ...rest);
  }
  fatal(message: any, context?: string): void;
  fatal(message: any, ...optionalParams: [...any, string?]): void;
  fatal(message: unknown, context?: unknown, ...rest: unknown[]): void {
    this.logger.fatal(message, context, ...rest);
  }
  private logger = new Logger(DrizzleNestLogger.name);
  logQuery(query: string, params: unknown[]): void {
    // this.logger.debug({ query, params });
    this.logger.debug(`${query} | Params: ${JSON.stringify(params)}`);
  }
}

export const db = drizzle(postgresDBClient, {
  schema,
  logger: isProduction ? false : new DrizzleNestLogger(),
}) as PostgresJsDatabase<typeof schema>;

@Global()
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
