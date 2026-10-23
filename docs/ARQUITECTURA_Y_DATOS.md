# Arquitectura y datos

Adjudica is a configurable application for public procurement analysis. Each instance supplies its site configuration, contracting-authority catalog, SQLite database, and optional business catalogs.

## Instance files

- `site.config.json`: site name, description, canonical URL, geographic label, logo, colors, and optional location metadata.
- `data/contracting-authorities.json`: PLACSP profile identifiers and official names for the authorities included in this deployment.
- `data/*.db`: generated SQLite database. Configure `ADJUDICA_DB_PATH` when the instance stores it outside the application directory.
- `data/catalogs/`: optional corporate groups, verified mappings, and correction catalogs.

## Data model

The canonical SQLite schema is defined in `scripts/canonical-schema.js`. Contracts refer to an independent `contracting_authorities` row using `contracting_authority_id`; `placsp_id` is the stable external identity. Official names and normalized names are never used as entity identifiers.

## PLACSP ingestion

The sync scripts download the official yearly ZIP feeds into a temporary raw-data folder, parse contract and lot records, and update the configured instance database. ZIP feeds are runtime inputs and are not required in source control. The instance workflows decide when to download and commit updated database files.

## Database paths

Scripts use `scripts/instance-paths.js`. Set `ADJUDICA_INSTANCE_ROOT`, `ADJUDICA_DATA_DIR`, `ADJUDICA_DB_PATH`, `ADJUDICA_AUTHORITIES_CONFIG_PATH`, and `ADJUDICA_CATALOG_DIR` when code and instance data live in separate repositories.
