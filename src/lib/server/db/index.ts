import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

let _db: ReturnType<typeof drizzle> | null = null;

function getDb() {
	if (!_db) {
		if (!env.SQLITE_DATABASE_PATH) throw new Error('SQLITE_DATABASE_PATH is not set');
		const client = new Database(env.SQLITE_DATABASE_PATH);

		// Change client.pragma(...) to client.run(...)
		client.run('PRAGMA journal_mode = WAL;');

		// Highly Recommended: Set synchronous to NORMAL when using WAL.
		// Without this, WAL mode loses a lot of its write-performance benefits.
		client.run('PRAGMA synchronous = NORMAL;');

		_db = drizzle(client, { schema });
	}
	return _db;
}

// This is done so that CI passes even when there is no database_url given but the code can just use `db`
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
	get(_, prop) {
		return getDb()[prop as keyof ReturnType<typeof drizzle>];
	}
});
