# Adjudica

Adjudica es la aplicación común para consultar y analizar la contratación pública. Cada portal se configura en su propio repositorio: allí se guardan la marca, los organismos, la base SQLite y los datos particulares. El código se comparte desde este repositorio mediante un submódulo.

## Crear un portal

Usa la plantilla [Adjudica Starter](https://github.com/soker90/adjudica-starter/generate). La guía de configuración está disponible en la aplicación y en el [README de la plantilla](https://github.com/soker90/adjudica-starter#readme).

En la plantilla se configuran el nombre y el logotipo del portal, los perfiles de contratación PLACSP que se quieren seguir, y la SQLite de la instancia. Las actualizaciones se ejecutan con GitHub Actions; no hace falta copiar el código de la aplicación.

## Archivos de configuración

- `site.config.json`: nombre, descripción, URL, ámbito geográfico, logotipo y tema visual.
- `data/contracting-authorities.json`: perfiles PLACSP incluidos en el portal, uno por organismo.
- `data/contracts.db`: base SQLite generada para los datos de ese portal.
- `public/logo.svg`: imagen de marca predeterminada.

Consulta [`data/contracting-authorities.example.json`](data/contracting-authorities.example.json) para ver el formato de cada perfil.

## Desarrollo local

Requisitos: Node.js 22 o posterior y pnpm 11.

```sh
pnpm install
pnpm run init-db
pnpm dev
```

En una instancia, selecciona su base de datos con `ADJUDICA_DB_PATH`, el catálogo de organismos con `ADJUDICA_AUTHORITIES_CONFIG_PATH` y la raíz de configuración y datos con `ADJUDICA_INSTANCE_ROOT`.
