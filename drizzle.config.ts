import { defineConfig } from 'drizzle-kit';

if (!process.env.SQLITE_DATABASE_PATH) throw new Error('SQLITE_DATABASE_PATH is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'sqlite',
	dbCredentials: { url: process.env.SQLITE_DATABASE_PATH },
	verbose: true,
	strict: true
});
