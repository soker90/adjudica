const path = require('node:path');

const APP_ROOT = path.resolve(__dirname, '..');
const INSTANCE_ROOT = path.resolve(process.env.ADJUDICA_INSTANCE_ROOT || APP_ROOT);
const DATA_DIR = path.resolve(process.env.ADJUDICA_DATA_DIR || path.join(INSTANCE_ROOT, 'data'));
const RAW_DIR = path.resolve(process.env.ADJUDICA_RAW_DIR || path.join(INSTANCE_ROOT, 'data_raw'));
const CATALOG_DIR = path.resolve(process.env.ADJUDICA_CATALOG_DIR || path.join(INSTANCE_ROOT, 'src', 'data'));
const DB_PATH = path.resolve(process.env.ADJUDICA_DB_PATH || path.join(DATA_DIR, 'contracts.db'));
const AUTHORITIES_CONFIG_PATH = path.resolve(
  process.env.ADJUDICA_AUTHORITIES_CONFIG_PATH || path.join(DATA_DIR, 'contracting-authorities.json')
);

module.exports = { APP_ROOT, INSTANCE_ROOT, DATA_DIR, RAW_DIR, CATALOG_DIR, DB_PATH, AUTHORITIES_CONFIG_PATH };
