#!/usr/bin/env node
const { DatabaseSync } = require('node:sqlite');
const { DB_PATH } = require('./instance-paths');
const path = require('node:path');


function vacuumDatabase(db) {
  db.exec('PRAGMA journal_mode = DELETE; VACUUM;');
}

function main() {
  const db = new DatabaseSync(DB_PATH);
  try {
    console.log('🧹 Compactando base de datos (VACUUM)...');
    vacuumDatabase(db);
    console.log('✅ VACUUM completado.');
  } finally {
    db.close();
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error('Error al compactar la base de datos:', error);
    process.exitCode = 1;
  }
}

module.exports = { vacuumDatabase, DB_PATH };
