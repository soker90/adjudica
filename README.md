# Adjudica

Adjudica is a municipality-agnostic foundation for configuring public contracting authorities and processing procurement data from PLACSP. It contains no deployment identity, contracting-authority dataset, or municipality-specific rules. A deployment supplies those through its own configuration and data.

## Authority configuration

Use [`data/contracting-authorities.example.json`](data/contracting-authorities.example.json), validated against [`src/data/contracting-authorities.schema.json`](src/data/contracting-authorities.schema.json). Each authority is an independent entity. Use `contracting_authority_id` as the internal key and `placsp_id` as its stable external identity. `name` is the official display name, and `scope` describes the institutional scope. Do not use a display or normalized name as an identifier.

## Shared data utilities

- `src/data/canonical-schema.js`: canonical database table and column mappings.
- `src/data/contract-identity.js`: stable internal contract identity helpers.
- `src/data/award-amount.js`: award amount classification helpers.
- `src/placsp/xml.js`: PLACSP XML parsing helpers.
- `src/privacy/`: fiscal identifier validation and privacy helpers.

This repository is intended to be reusable by independent deployments. Deployment-specific configuration and datasets belong in the consuming project.
