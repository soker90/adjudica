import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Check, GitFork, ShieldCheck } from 'lucide-react';

const templateUrl = 'https://github.com/soker90/adjudica-starter/generate';

export const metadata: Metadata = {
  title: 'Crear una instancia | Adjudica',
  description: 'Guía para crear un portal propio de contratación pública con Adjudica Starter y los organismos que quieras seguir.',
};

const authorityExample = `{
  "version": 1,
  "contracting_authorities": [
    {
      "id": "organismo-001",
      "placsp_id": "ID_DEL_PERFIL_PLACSP",
      "nif": "NIF_DEL_ORGANISMO",
      "name": "Nombre oficial del organismo",
      "scope": "Directa Municipal",
      "historical_names": []
    }
  ]
}`;

const setupCommands = `git clone --recurse-submodules URL_DE_TU_REPOSITORIO
cd NOMBRE_DEL_REPOSITORIO/adjudica
pnpm install
ADJUDICA_INSTANCE_ROOT=.. ADJUDICA_INSTANCE_DB_PATH=../data/contracts.db pnpm prepare:instance
pnpm dev`;

export default function CrearInstanciaPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <header className="space-y-4 border-b border-slate-200 pb-7">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Adjudica Starter</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Crea un portal con los organismos que quieras
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600">
            Adjudica aporta la aplicación común. Tu nuevo repositorio guarda el nombre, el logotipo, la lista de perfiles PLACSP y su base de datos. No hace falta copiar ni modificar el código de Adjudica.
          </p>
          <a
            href={templateUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
          >
            Crear repositorio desde la plantilla
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </header>

        <section className="space-y-5" aria-labelledby="pasos-title">
          <h2 id="pasos-title" className="text-xl font-bold text-slate-900">Configuración inicial</h2>
          <ol className="space-y-4">
            <li className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">1. Crea tu repositorio</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Abre <a className="font-semibold text-emerald-700 hover:underline" href={templateUrl} target="_blank" rel="noreferrer">Adjudica Starter</a>, pulsa «Create a new repository» y elige el propietario y el nombre. GitHub creará una copia de la plantilla para tu portal.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">2. Personaliza nombre, descripción y ámbito</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Edita <code className="rounded bg-slate-100 px-1.5 py-0.5">site.config.json</code>: completa <code>siteName</code>, <code>siteDescription</code>, <code>siteUrl</code> y <code>geographicLabel</code>. Si quieres clasificar proveedores por proximidad, añade también localidad, provincia, alias y NIF locales.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">3. Añade la identidad visual</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Sustituye <code className="rounded bg-slate-100 px-1.5 py-0.5">public/logo.svg</code> por el logotipo de tu portal y ajusta los colores en la sección <code>theme</code> de <code>site.config.json</code>.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">4. Elige los organismos</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                En <code className="rounded bg-slate-100 px-1.5 py-0.5">data/contracting-authorities.json</code>, añade una entrada por cada perfil de contratación que quieras incluir. Usa el identificador del perfil PLACSP, el nombre oficial y los nombres históricos que ayuden a reconocer sus publicaciones.
              </p>
              <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-relaxed text-slate-100"><code>{authorityExample}</code></pre>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                Cada <code>id</code> debe ser único y estable. El campo <code>scope</code> admite <code>Directa Municipal</code> para el grupo principal y <code>Indirecta (Mancomunidad)</code> para organismos asociados; el ejemplo de la plantilla muestra el formato.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">5. Clona con el código y prueba el portal</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                El repositorio incluye una SQLite vacía con el esquema preparado. Clona también el submódulo Adjudica y arranca la aplicación:
              </p>
              <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-relaxed text-slate-100"><code>{setupCommands}</code></pre>
            </li>
          </ol>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 font-semibold text-slate-900"><GitFork className="h-4 w-4 text-emerald-700" /> Datos y actualizaciones</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Los flujos de GitHub Actions descargan las publicaciones y guardan los resultados en <code>data/contracts.db</code>. Al terminar la configuración, ejecuta manualmente <strong>update-contracts</strong> para cargar los primeros datos; después se actualizarán según su calendario. Los ZIP descargados no se guardan en el repositorio.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 font-semibold text-slate-900"><ShieldCheck className="h-4 w-4 text-emerald-700" /> Secreto de privacidad</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Crea un valor estable para <code>DNI_SALT</code>. Guárdalo como secreto de Actions en el repositorio y como variable de entorno en Vercel. Usa el mismo valor en ambos sitios y no lo añadas a los archivos del repositorio.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
            <div>
              <h2 className="font-bold text-slate-900">Despliega en Vercel</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Importa el nuevo repositorio y deja el directorio raíz en <code>.</code>. La configuración incluida prepara el submódulo y copia la marca y la base de datos de tu instancia durante la compilación. En GitHub, permite que Actions tenga permisos de lectura y escritura para que pueda guardar las actualizaciones SQLite.
              </p>
              <a className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:underline" href={templateUrl} target="_blank" rel="noreferrer">
                Abrir Adjudica Starter <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <p className="text-sm text-slate-500">
          Consulta también el <Link className="font-semibold text-emerald-700 hover:underline" href="https://github.com/soker90/adjudica-starter" target="_blank">repositorio de la plantilla</Link> y el <Link className="font-semibold text-emerald-700 hover:underline" href="https://github.com/soker90/adjudica">código de Adjudica</Link>.
        </p>
      </div>
    </main>
  );
}
