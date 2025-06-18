import fs from 'fs/promises';
import { Database } from 'better-sqlite3';

function hasMigrationRun(db: Database, filename: string) {
    const result = db.prepare('SELECT name FROM migrations WHERE name = ?').get(filename);
    return !!result;
}

async function executeMigration(db: Database, filename: string) {
    console.log(`Running migration: ${filename}`);
    const sql = await fs.readFile(`./migrations/${filename}`, 'utf8');
    db.exec(sql);
}

function recordMigration(db: Database, filename: string) {
    db.prepare('INSERT INTO migrations (name) VALUES (?)').run(filename);
}

export async function performMigrations(db: Database) {
    db.prepare(
        `
        CREATE TABLE IF NOT EXISTS migrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `
    ).run();

    const files = await fs.readdir('./migrations');
    const migrations = files.filter((file) => file.endsWith('.sql')).sort();

    for (const migration of migrations) {
        if (!hasMigrationRun(db, migration)) {
            await executeMigration(db, migration);
            recordMigration(db, migration);
        }
    }
}
