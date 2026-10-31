# Adjudica

Adjudica es la aplicación común para consultar y analizar la contratación pública. Cada portal se configura en su propio repositorio: allí se guardan la marca, los organismos, la base SQLite y los datos particulares. El código se comparte desde este repositorio mediante un submódulo.

## Crear un portal

Usa la plantilla [Adjudica Starter](https://github.com/soker90/adjudica-starter/generate). La guía de configuración está disponible en la aplicación y en el [README de la plantilla](https://github.com/soker90/adjudica-starter#readme).

En la plantilla se configuran el nombre y el logotipo del portal, los perfiles de contratación PLACSP que se quieren seguir, y la SQLite de la instancia. Las actualizaciones se ejecutan con GitHub Actions; no hace falta copiar el código de la aplicación.

## Archivos de configuración

- `site.config.json`: nombre, descripción, URL, ámbito geográfico, logotipo, tema visual y textos de presentación.
- `scopePresentation` en `site.config.json`: etiquetas, nombres cortos, descripciones y tooltips de los grupos principal, asociado y consolidado. `associated.enabled` permite ocultar el grupo asociado cuando la instancia no lo utiliza. La aplicación mantiene sus identificadores internos y cada instancia puede sustituir todos los textos visibles sin modificar el código común.
- `methodology` en `site.config.json`: versión, título, introducción y secciones de metodología propias de la instancia. Si no se define, se muestra la metodología genérica de Adjudica.
- `data/contracting-authorities.json`: perfiles PLACSP incluidos en el portal, uno por organismo.
- `data/contracts.db`: base SQLite generada para los datos de ese portal.
- `public/logo.svg`: imagen de marca predeterminada.

Consulta [`data/contracting-authorities.example.json`](data/contracting-authorities.example.json) para ver el formato de cada perfil.

## Pruebas

El repositorio común ejecuta en CI las pruebas independientes de los datos de cada portal mediante `pnpm run test:ci`. Las pruebas de integración que necesitan una base de datos poblada se ejecutan en el repositorio de cada instancia, donde están disponibles su SQLite y sus catálogos. Para ejecutar localmente toda la batería se utiliza `pnpm test`.

## Desarrollo local

Requisitos: Node.js 22 o posterior y pnpm 11.

```sh
pnpm install
pnpm run init-db
pnpm dev
```

En una instancia, selecciona su base de datos con `ADJUDICA_DB_PATH`, el catálogo de organismos con `ADJUDICA_AUTHORITIES_CONFIG_PATH` y la raíz de configuración y datos con `ADJUDICA_INSTANCE_ROOT`.

## Versiones

La versión de la aplicación se mantiene en `package.json` y se publica con etiquetas Git `vX.Y.Z`. Cada instancia fija una versión concreta mediante el commit registrado en el submódulo `adjudica`; no se actualiza automáticamente al cambiar la rama principal.

Para actualizar una instancia a una versión publicada, desde la raíz de su repositorio ejecuta:

```sh
git -C adjudica fetch --tags origin
git -C adjudica checkout vX.Y.Z
git add adjudica
git commit -m "Actualiza Adjudica a vX.Y.Z"
```

Así, el tag identifica el release y el commit de la instancia conserva la referencia exacta que debe desplegar.
