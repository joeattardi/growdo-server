import Database, { Database as SqliteDatabase } from 'better-sqlite3';
import { performMigrations } from './migrations';

export let db: SqliteDatabase;

export function initializeDatabase() {
    db = new Database('growdo.db', { verbose: console.log });
    performMigrations(db);
}
