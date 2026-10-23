#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const appRoot = path.resolve(__dirname, '..');
const instanceRoot = path.resolve(process.env.ADJUDICA_INSTANCE_ROOT || appRoot);
const siteConfigSource = path.resolve(process.env.ADJUDICA_SITE_CONFIG_PATH || path.join(instanceRoot, 'site.config.json'));
const logoSource = path.resolve(process.env.ADJUDICA_LOGO_PATH || path.join(instanceRoot, 'public', 'logo.svg'));
const databaseSource = process.env.ADJUDICA_INSTANCE_DB_PATH
  ? path.resolve(process.env.ADJUDICA_INSTANCE_DB_PATH)
  : path.join(instanceRoot, 'data', 'contracts.db');
const historicalDataSource = path.resolve(process.env.ADJUDICA_HISTORICAL_DATA_PATH || path.join(instanceRoot, 'data', 'historical-sources.json'));

function copyWhenExternal(source, destination, label) {
  if (!fs.existsSync(source)) {
    if (source.startsWith(instanceRoot)) throw new Error(`${label} not found: ${source}`);
    return;
  }
  if (path.resolve(source) === path.resolve(destination)) return;
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
  console.log(`Prepared instance ${label}.`);
}

copyWhenExternal(siteConfigSource, path.join(appRoot, 'site.config.json'), 'site configuration');
copyWhenExternal(logoSource, path.join(appRoot, 'public', 'logo.svg'), 'logo');
if (fs.existsSync(databaseSource)) {
  copyWhenExternal(databaseSource, path.join(appRoot, 'data', 'contracts.db'), 'SQLite database');
} else {
  console.warn(`No instance database found at ${databaseSource}; build will use the local Adjudica database if present.`);
}
if (fs.existsSync(historicalDataSource)) {
  copyWhenExternal(historicalDataSource, path.join(appRoot, 'data', 'historical-sources.json'), 'historical source data');
}
