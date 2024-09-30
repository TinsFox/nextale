export function projectRootPath() {
  return process.cwd();
}

export function srcPath() {
  return `${projectRootPath()}/src`;
}

export function schemaPath() {
  return `${srcPath()}/schema.ts`;
}

export function databaseMigratePath() {
  return `${srcPath()}/database/drizzle`;
}
