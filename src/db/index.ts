import Database, { Database as SqliteDatabase } from 'better-sqlite3';
import { performMigrations } from './migrations';
import { createLogger } from '../logger';

const logger = createLogger('db');

export let db: SqliteDatabase;

export function initializeDatabase() {
    logger.info('Initializing database');
    db = new Database('growdo.db', { verbose: console.log });
    performMigrations(db);
}
