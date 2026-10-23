# Adjudica

Adjudica is the generic application for public procurement transparency and analysis. Configure each deployment through its site configuration, PLACSP contracting-authority list, database, and visual assets. Keep deployment-specific configuration and data in the instance repository.

## Instance configuration

- `site.config.json`: site name, description, canonical URL, geographic label, logo and theme.
- `data/contracting-authorities.json`: the PLACSP profiles included in the deployment. Add one entry for each authority to monitor.
- `data/*.db`: generated SQLite database for that instance.
- `public/logo.svg`: default brand mark; an instance can replace it during its build.

See [`data/contracting-authorities.example.json`](data/contracting-authorities.example.json) for the authority shape. Each authority is independent and has a stable internal `id`, external `placsp_id`, official `name`, and institutional `scope`.

## Development

Requirements: Node.js 22+ and pnpm 11.

```sh
pnpm install
pnpm run init-db
pnpm dev
```

The instance database can be selected with `ADJUDICA_DB_PATH`; the authority catalog with `ADJUDICA_AUTHORITIES_CONFIG_PATH`; and the instance root with `ADJUDICA_INSTANCE_ROOT`.
